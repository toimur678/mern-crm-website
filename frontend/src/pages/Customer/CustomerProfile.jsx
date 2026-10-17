import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request } from '@/request';
import { Avatar, Button, Spin, Table, Tag, Alert } from 'antd';
import dayjs from 'dayjs';
import { useMoney, useDate } from '@/settings';
import PageHeader from '@/components/PageHeader';
import Icon from '@/components/Icon';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { moneyFormatter } = useMoney();
  const { dateFormat } = useDate();
  const [customer, setCustomer] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceError, setInvoiceError] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const loadInvoices = async (page = 1) => {
    setInvoiceLoading(true);
    const response = await request.list({ entity: 'invoice', options: { filter: 'client', equal: id, page, items: 5 } });
    setInvoiceError(!response?.success);
    if (response?.success) {
      setInvoices(response.result || []);
      setPagination({ current: page, pageSize: 5, total: response.pagination?.count || 0 });
    }
    setInvoiceLoading(false);
  };
  useEffect(() => {
    let active = true;
    setLoading(true);
    request.read({ entity: 'client', id }).then((response) => { if (active) { setCustomer(response?.result || null); setLoading(false); } });
    loadInvoices();
    return () => { active = false; };
  }, [id]);
  const columns = [
    { title: 'Invoice', dataIndex: 'number', render: (number, record) => <Button type="link" className="record-number" onClick={() => navigate(`/invoice/read/${record._id}`)}>INV-{record.year}-{String(number).padStart(3, '0')}</Button> },
    { title: 'Date', dataIndex: 'date', render: (date) => dayjs(date).format(dateFormat) },
    { title: 'Amount', dataIndex: 'total', align: 'right', render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }) },
    { title: 'Payment', dataIndex: 'paymentStatus', render: (status) => <Tag bordered={false} color={status === 'paid' ? 'green' : 'orange'}>{status === 'partially' ? 'Partially paid' : status === 'paid' ? 'Paid' : 'Unpaid'}</Tag> },
  ];
  if (loading) return <div className="record-loading"><Spin /></div>;
  return <div className="record-workspace">
    <PageHeader title={customer?.name || 'Customer details'} description="The details and invoices that bring this relationship together." onBack={() => navigate('/customer')} extra={customer ? [<Button key="invoice" type="primary" icon={<Icon component={PlusIcon} />} onClick={() => navigate('/invoice/create')}>Create invoice</Button>] : []} />
    {!customer ? <Alert type="warning" showIcon message="Customer could not be loaded" description="Return to customers and try opening this record again." /> : <>
      <section className="record-detail-card">
        <div className="record-customer-identity"><Avatar shape="square" size={64}>{customer.name?.slice(0, 2).toUpperCase()}</Avatar><div><h2>{customer.name}</h2><p>{customer.created ? `Customer since ${dayjs(customer.created).format('MMMM YYYY')}` : 'Customer account'}</p></div></div>
        <dl className="record-contact-list">
          <div><dt>Email address</dt><dd>{customer.email ? <a href={`mailto:${customer.email}`}>{customer.email}</a> : 'Not provided'}</dd></div>
          <div><dt>Phone number</dt><dd>{customer.phone ? <a href={`tel:${customer.phone}`}>{customer.phone}</a> : 'Not provided'}</dd></div>
          <div><dt>Address</dt><dd>{customer.address || 'Not provided'}</dd></div>
          <div><dt>Country</dt><dd>{customer.country || 'Not provided'}</dd></div>
        </dl>
      </section>
      <section className="record-table-card" style={{ marginTop: 24 }}>
        <div className="record-table-toolbar"><div className="record-list-label">Customer invoices<span className="record-count">{pagination.total}</span></div></div>
        {invoiceError ? <Alert type="warning" message="Invoices could not be loaded" action={<Button onClick={() => loadInvoices()}>Try again</Button>} /> : <Table rowKey="_id" columns={columns} dataSource={invoices} loading={invoiceLoading} pagination={pagination} onChange={(page) => loadInvoices(page.current)} scroll={{ x: 560 }} locale={{ emptyText: <div className="record-empty"><h3>No invoices yet</h3><p>Create an invoice to start working together.</p></div> }} />}
      </section>
    </>}
  </div>;
}
