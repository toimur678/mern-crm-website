import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Button, Input, Table, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import { useCrudContext } from '@/context/crud';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import PageHeader from '@/components/PageHeader';
import Icon from '@/components/Icon';
import { EyeIcon, PencilIcon, TrashIcon, EllipsisHorizontalIcon, ArrowPathIcon, PlusIcon, MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function DataTable({ config, extra = [] }) {
  const { entity, fields, searchConfig, DATATABLE_TITLE, ADD_NEW_ENTITY } = config;
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox, advancedBox } = crudContextAction;
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const { dateFormat } = useDate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { result, isLoading } = useSelector(selectListItems);
  const { pagination = {}, items = [] } = result;
  const mutationSucceeded = useSelector((state) => state.crud.create.isSuccess || state.crud.update.isSuccess || state.crud.delete.isSuccess);
  const searchFields = searchConfig?.searchFields || 'name';
  const load = (page = 1, pageSize = pagination.pageSize || 10) => dispatch(crud.list({ entity, options: { page, items: pageSize, ...(search.trim() ? { q: search.trim(), fields: searchFields } : {}) } }));

  useEffect(() => {
    const timer = setTimeout(() => load(), search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [entity, search]);

  useEffect(() => { if (mutationSucceeded) load(); }, [mutationSucceeded]);

  const addNew = () => { collapsedBox.close(); panel.open(); };
  const read = (record) => {
    if (entity === 'client') navigate(`/customer/read/${record._id}`);
    else { dispatch(crud.currentItem({ data: record })); panel.open(); collapsedBox.open(); readBox.open(); }
  };
  const edit = (record) => {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    editBox.open(); panel.open(); collapsedBox.open();
  };
  const remove = (record) => { dispatch(crud.currentAction({ actionType: 'delete', data: record })); modal.open(); };
  const baseColumns = fields ? dataForTable({ fields, translate, moneyFormatter, dateFormat }) : config.dataTableColumns;
  const columns = baseColumns.map((column) => entity === 'client' && (Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex) === 'name' ? {
    ...column, title: 'Customer', width: 250,
    render: (name, record) => <button className="record-customer-link" onClick={() => read(record)}><Avatar shape="square" size={36}>{(name || '?').slice(0, 2).toUpperCase()}</Avatar><span><strong>{name || 'Unnamed customer'}</strong><small>Customer account</small></span></button>,
  } : { ...column, render: column.render || ((value) => value ?? '—') });
  columns.push({
    title: '', key: 'actions', width: 60, align: 'right',
    render: (_, record) => <Dropdown trigger={['click']} menu={{ items: [
      { key: 'read', label: 'View details', icon: <Icon component={EyeIcon} /> },
      { key: 'edit', label: 'Edit details', icon: <Icon component={PencilIcon} /> },
      ...extra, { type: 'divider' }, { key: 'delete', label: 'Delete', danger: true, icon: <Icon component={TrashIcon} /> },
    ], onClick: ({ key }) => {
      if (key === 'read') read(record);
      if (key === 'edit') edit(record);
      if (key === 'delete') remove(record);
      if (key === 'updatePassword') { dispatch(crud.currentItem({ data: record })); dispatch(crud.currentAction({ actionType: 'update', data: record })); advancedBox.open(); panel.open(); collapsedBox.open(); }
    } }}><Button type="text" aria-label={`Actions for ${record.name || 'record'}`} icon={<Icon component={EllipsisHorizontalIcon} />} /></Dropdown>,
  });

  return <>
    <PageHeader title={DATATABLE_TITLE} description={config.PAGE_DESCRIPTION || 'A clear view of the people and details behind your business.'} extra={[<Button key="add" type="primary" onClick={addNew} icon={<Icon component={PlusIcon} />}>{ADD_NEW_ENTITY}</Button>]} />
    <section className="record-table-card" aria-label={DATATABLE_TITLE}>
      <div className="record-table-toolbar">
        <div className="record-list-label">{entity === 'client' ? 'All customers' : DATATABLE_TITLE}<span className="record-count">{pagination.total || 0}</span></div>
        <div className="record-table-controls">
          <Input value={search} onChange={(event) => setSearch(event.target.value)} prefix={<Icon component={MagnifyingGlassIcon} />} placeholder={entity === 'client' ? 'Search name, email or phone…' : 'Search records…'} aria-label="Search records" allowClear />
          <Button onClick={() => load(pagination.current)} loading={isLoading} aria-label="Refresh records" icon={<Icon component={ArrowPathIcon} />} />
        </div>
      </div>
      <Table columns={columns} rowKey="_id" dataSource={items} loading={isLoading} onChange={(page) => load(page.current, page.pageSize)} scroll={{ x: 750 }} pagination={{ ...pagination, showSizeChanger: false, showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} records` }} locale={{ emptyText: <div className="record-empty"><Icon component={UsersIcon} /><h3>{search ? 'No matching records' : 'Your next connection starts here'}</h3><p>{search ? 'Try another name, email or phone number.' : 'Add your first record to keep every detail in one place.'}</p>{!search && <Button type="primary" onClick={addNew}>{ADD_NEW_ENTITY}</Button>}</div> }} />
    </section>
  </>;
}
