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
import { PencilIcon, DocumentArrowDownIcon, EnvelopeIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function ReadItem({ config, selectedItem }) {
  const { entity } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { moneyFormatter } = useMoney();
  const { dateFormat } = useDate();
  const { send, isLoading: mailInProgress } = useMail({ entity });
  const { result } = useSelector(selectCurrentItem);
  const record = result || selectedItem || {};
  const client = record.client || {};
  const balance = Math.max(0, Number(record.total || 0) - Number(record.discount || 0) - Number(record.credit || 0));
  const format = (amount) => moneyFormatter({ amount: amount || 0, currency_code: record.currency });
  const download = () => window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`, '_blank', 'noopener,noreferrer');
  return <>
    <PageHeader onBack={() => navigate(`/${entity}`)} title={`${entity === 'invoice' ? 'Invoice' : 'Quote'} #${record.number || ''}`} description={`${record.year || ''}${client.name ? ` · ${client.name}` : ''}`} tags={<Tag bordered={false} color={record.paymentStatus === 'paid' ? 'green' : 'default'}>{record.status || 'Draft'}</Tag>} extra={[
      <Button key="download" onClick={download} icon={<Icon component={DocumentArrowDownIcon} />}>Download PDF</Button>,
      <Button key="email" loading={mailInProgress} onClick={() => send(record._id)} icon={<Icon component={EnvelopeIcon} />}>Send by email</Button>,
      <Button key="edit" onClick={() => { dispatch(erp.currentAction({ actionType: 'update', data: record })); navigate(`/${entity}/update/${record._id}`); }} icon={<Icon component={PencilIcon} />}>Edit</Button>,
      entity === 'invoice' && <Button key="pay" type="primary" disabled={balance <= 0} onClick={() => navigate(`/invoice/pay/${record._id}`)} icon={<Icon component={CreditCardIcon} />}>{balance <= 0 ? 'Fully paid' : 'Record payment'}</Button>,
    ]} />
    <div className="record-overview-grid"><div className="record-overview-item"><span>Invoice total</span><strong>{format(record.total)}</strong></div><div className="record-overview-item"><span>Paid to date</span><strong>{format(record.credit)}</strong></div><div className="record-overview-item is-accent"><span>Balance due</span><strong>{format(balance)}</strong></div></div>
    <section className="record-detail-card">
      <div className="record-document-top"><div><span className="record-eyebrow">Billed to</span><h2>{client.name || 'Customer'}</h2><p>{client.address}</p><p>{client.email}</p><p>{client.phone}</p></div><div className="record-document-meta"><span className="record-eyebrow">Invoice details</span><h2>INV-{record.year}-{String(record.number || 0).padStart(3, '0')}</h2><p>Issued {record.date ? dayjs(record.date).format(dateFormat) : '—'}</p><p>Due {record.expiredDate ? dayjs(record.expiredDate).format(dateFormat) : '—'}</p><Tag bordered={false} color={record.paymentStatus === 'paid' ? 'green' : 'orange'}>{record.paymentStatus === 'partially' ? 'Partially paid' : record.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}</Tag></div></div>
      <div className="record-document-items"><table className="record-document-table"><thead><tr><th>Item / description</th><th>Quantity</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>{(record.items || []).map((item, index) => <tr key={item._id || index}><td><strong>{item.itemName}</strong><small>{item.description}</small></td><td>{item.quantity}</td><td>{format(item.price)}</td><td><strong>{format(item.total)}</strong></td></tr>)}</tbody></table></div>
      <div className="record-invoice-summary"><div className="record-invoice-summary-inner"><div className="record-total-row"><span>Subtotal</span><strong>{format(record.subTotal)}</strong></div><div className="record-total-row"><span>Tax ({record.taxRate || 0}%)</span><strong>{format(record.taxTotal)}</strong></div><div className="record-total-row is-total"><span>Total</span><strong>{format(record.total)}</strong></div></div></div>
      {record.notes && <div style={{ marginTop: 24 }}><span className="record-eyebrow">Notes</span><p style={{ color: '#70817e', fontSize: 13, whiteSpace: 'pre-wrap' }}>{record.notes}</p></div>}
    </section>
  </>;
}
