import { Button, Tag } from 'antd';
import PageHeader from '@/components/PageHeader';
import { useMoney } from '@/settings';
import RecordPayment from './RecordPayment';
import { useNavigate } from 'react-router-dom';

export default function Payment({ config, currentItem }) {
  const navigate = useNavigate();
  const { moneyFormatter } = useMoney();
  const invoice = currentItem || {};
  const format = (amount) => moneyFormatter({ amount: amount || 0, currency_code: invoice.currency });
  const balance = Math.max(0, Number(invoice.total || 0) - Number(invoice.discount || 0) - Number(invoice.credit || 0));
  return <>
    <PageHeader onBack={() => navigate(`/invoice/read/${invoice._id}`)} title="Record a payment" description={`Invoice #${invoice.number} · ${invoice.client?.name || 'Customer'}`} extra={[<Button key="invoice" onClick={() => navigate(`/invoice/read/${invoice._id}`)}>View invoice</Button>]} />
    <div className="record-two-columns">
      <section className="record-form-card"><h2 className="record-section-heading">Payment details</h2><p className="record-section-description">Add the amount received and how it was paid.</p><RecordPayment config={config} /></section>
      <aside className="record-detail-card"><span className="record-eyebrow">Invoice summary</span><h2 className="record-section-heading">{invoice.client?.name}</h2><p className="record-section-description">{invoice.client?.email}</p><Tag bordered={false} color={balance ? 'orange' : 'green'}>{invoice.paymentStatus === 'partially' ? 'Partially paid' : balance ? 'Unpaid' : 'Paid'}</Tag><div className="record-total-row"><span>Invoice total</span><strong>{format(invoice.total)}</strong></div><div className="record-total-row"><span>Already paid</span><strong>{format(invoice.credit)}</strong></div><div className="record-total-row is-total"><span>Balance due</span><strong>{format(balance)}</strong></div></aside>
    </div>
  </>;
}
