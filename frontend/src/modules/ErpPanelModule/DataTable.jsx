import { useEffect, useState } from 'react';
import { Dropdown, Button, Select, Table } from 'antd';
import PageHeader from '@/components/PageHeader';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectListItems } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';
import { useNavigate } from 'react-router-dom';
import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { EyeIcon, PencilIcon, TrashIcon, DocumentArrowDownIcon, ArrowPathIcon, PlusIcon, EllipsisHorizontalIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function DataTable({ config, extra = [] }) {
  const { entity, DATATABLE_TITLE, ADD_NEW_ENTITY, disableAdd } = config;
  const { result, isLoading } = useSelector(selectListItems);
  const { pagination = {}, items: dataSource = [] } = result;
  const { erpContextAction: { modal } } = useErpContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteSucceeded = useSelector((state) => state.erp.delete.isSuccess);
  const [customer, setCustomer] = useState();
  const [status, setStatus] = useState();
  const [filterVersion, setFilterVersion] = useState(0);
  const load = (page = 1, pageSize = pagination.pageSize || 10) => {
    const options = { page, items: pageSize };
    if (customer) Object.assign(options, { filter: 'client', equal: customer });
    else if (status) Object.assign(options, { filter: 'paymentStatus', equal: status });
    dispatch(erp.list({ entity, options }));
  };
  useEffect(() => { load(); }, [entity, customer, status]);
  useEffect(() => { if (deleteSucceeded) load(); }, [deleteSucceeded]);
  const read = (record) => { dispatch(erp.currentItem({ data: record })); navigate(`/${entity}/read/${record._id}`); };
  const columns = [...config.dataTableColumns, {
    title: '', key: 'actions', width: 60, align: 'right',
    render: (_, record) => <Dropdown trigger={['click']} menu={{ items: [
      { key: 'read', label: 'View details', icon: <Icon component={EyeIcon} /> },
      { key: 'edit', label: 'Edit', icon: <Icon component={PencilIcon} /> },
      { key: 'download', label: 'Download PDF', icon: <Icon component={DocumentArrowDownIcon} /> },
      ...extra, { type: 'divider' }, { key: 'delete', label: 'Delete', danger: true, icon: <Icon component={TrashIcon} /> },
    ], onClick: ({ key }) => {
      if (key === 'read') read(record);
      if (key === 'edit') { dispatch(erp.currentAction({ actionType: 'update', data: record })); navigate(`/${entity}/update/${record._id}`); }
      if (key === 'download') window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`, '_blank', 'noopener,noreferrer');
      if (key === 'delete') { dispatch(erp.currentAction({ actionType: 'delete', data: record })); modal.open(); }
      if (key === 'recordPayment') { dispatch(erp.currentItem({ data: record })); navigate(`/invoice/pay/${record._id}`); }
    } }}><Button type="text" aria-label={`Actions for ${entity} ${record.number}`} icon={<Icon component={EllipsisHorizontalIcon} />} /></Dropdown>,
  }];
  return <>
    <PageHeader title={DATATABLE_TITLE} description={entity === 'invoice' ? 'From the first draft to the final payment. Keep every invoice in view.' : 'Every payment, connected to the customer and invoice behind it.'} extra={disableAdd ? [<Button key="invoices" type="primary" onClick={() => navigate('/invoice')}>Record a payment</Button>] : [<Button key="add" type="primary" icon={<Icon component={PlusIcon} />} onClick={() => navigate(`/${entity}/create`)}>{ADD_NEW_ENTITY}</Button>]} />
    <section className="record-table-card" aria-label={DATATABLE_TITLE}>
      <div className="record-table-toolbar">
        <div className="record-list-label">{customer || status ? 'Filtered records' : `All ${entity === 'invoice' ? 'invoices' : 'payments'}`}<span className="record-count">{pagination.total || 0}</span></div>
        <div className="record-table-controls">
          <div className="record-customer-filter"><span className="record-filter-label">Customer</span><AutoCompleteAsync key={filterVersion} entity="client" displayLabels={['name']} searchFields="name" onChange={(value) => { setCustomer(value); if (value) setStatus(undefined); }} /></div>
          {entity === 'invoice' && <Select aria-label="Payment status" value={status} allowClear placeholder="Payment status" onChange={(value) => { setStatus(value); setCustomer(undefined); setFilterVersion((version) => version + 1); }} options={[{ label: 'Unpaid', value: 'unpaid' }, { label: 'Partially paid', value: 'partially' }, { label: 'Paid', value: 'paid' }]} />}
          <Button onClick={() => load(pagination.current)} loading={isLoading} aria-label="Refresh records" icon={<Icon component={ArrowPathIcon} />} />
        </div>
      </div>
      <Table columns={columns} rowKey="_id" dataSource={dataSource} loading={isLoading} onChange={(page) => load(page.current, page.pageSize)} scroll={{ x: entity === 'invoice' ? 900 : 750 }} pagination={{ ...pagination, showSizeChanger: false, showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} records` }} locale={{ emptyText: <div className="record-empty"><Icon component={DocumentTextIcon} /><h3>{customer || status ? 'No records match this filter' : entity === 'invoice' ? 'Ready for your first invoice?' : 'Payments will appear here'}</h3><p>{customer || status ? 'Choose another customer or clear your filter.' : entity === 'invoice' ? 'Create an invoice and keep the next step moving.' : 'Open an invoice and record a payment to get started.'}</p><Button type="primary" onClick={() => navigate(disableAdd ? '/invoice' : `/${entity}/create`)}>{disableAdd ? 'View invoices' : ADD_NEW_ENTITY}</Button></div> }} />
    </section>
    {entity === 'payment' && <p className="record-footnote">To add a payment, open an invoice and choose Record payment.</p>}
  </>;
}
