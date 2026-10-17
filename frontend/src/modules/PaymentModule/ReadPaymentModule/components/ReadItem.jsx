import { Button, Tag } from 'antd';
import PageHeader from '@/components/PageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectCurrentItem } from '@/redux/erp/selectors';
import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney, useDate } from '@/settings';
import useMail from '@/hooks/useMail';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { PencilIcon, DocumentArrowDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function ReadItem({ config, selectedItem }) {
  const { entity } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { moneyFormatter } = useMoney();
  const { dateFormat } = useDate();
  const { send, isLoading } = useMail({ entity });
  const { result } = useSelector(selectCurrentItem);
  const payment = result || selectedItem || {};
  const invoice = payment.invoice || {};
  const client = payment.client || invoice.client || {};
  const format = (amount) => moneyFormatter({ amount: amount || 0, currency_code: payment.currency || invoice.currency });
  return <>
    <PageHeader onBack={() => navigate('/payment')} title={`Payment #${payment.number || ''}`} description={client.name || 'Payment details'} tags={<Tag bordered={false} color="green">Received</Tag>} extra={[
      <Button key="download" icon={<Icon component={DocumentArrowDownIcon} />} onClick={() => window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${payment._id}.pdf`, '_blank', 'noopener,noreferrer')}>Download PDF</Button>,
      <Button key="email" icon={<Icon component={EnvelopeIcon} />} loading={isLoading} onClick={() => send(payment._id)}>Send by email</Button>,
      <Button key="edit" type="primary" icon={<Icon component={PencilIcon} />} onClick={() => { dispatch(erp.currentAction({ actionType: 'update', data: payment })); navigate(`/payment/update/${payment._id}`); }}>Edit payment</Button>,
    ]} />
    <div className="record-overview-grid"><div className="record-overview-item is-accent"><span>Amount received</span><strong>{format(payment.amount)}</strong></div><div className="record-overview-item"><span>Invoice total</span><strong>{format(invoice.total)}</strong></div><div className="record-overview-item"><span>Invoice balance</span><strong>{format(Math.max(0, Number(invoice.total || 0) - Number(invoice.discount || 0) - Number(invoice.credit || 0)))}</strong></div></div>
    <div className="record-two-columns"><section className="record-detail-card"><h2 className="record-section-heading">Payment information</h2><dl className="record-contact-list"><div><dt>Date received</dt><dd>{payment.date ? dayjs(payment.date).format(dateFormat) : '—'}</dd></div><div><dt>Payment method</dt><dd>{payment.paymentMode?.name || 'Not provided'}</dd></div><div><dt>Reference</dt><dd>{payment.ref || 'Not provided'}</dd></div><div><dt>Related invoice</dt><dd>{invoice._id ? <Button type="link" style={{ padding: 0, height: 'auto' }} onClick={() => navigate(`/invoice/read/${invoice._id}`)}>INV-{invoice.year}-{String(invoice.number).padStart(3, '0')}</Button> : 'Not available'}</dd></div></dl>{payment.description && <><span className="record-eyebrow" style={{ marginTop: 26 }}>Notes</span><p style={{ color: '#70817e' }}>{payment.description}</p></>}</section><aside className="record-detail-card"><span className="record-eyebrow">Customer</span><h2 className="record-section-heading">{client.name || 'Customer'}</h2><dl className="record-contact-list"><div><dt>Email</dt><dd>{client.email || 'Not provided'}</dd></div><div><dt>Phone</dt><dd>{client.phone || 'Not provided'}</dd></div><div><dt>Address</dt><dd>{client.address || 'Not provided'}</dd></div></dl></aside></div>
  </>;
}
