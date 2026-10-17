import { Button } from 'antd';
import PageHeader from '@/components/PageHeader';
import { useMoney } from '@/settings';
import { useNavigate } from 'react-router-dom';
import UpdatePayment from './UpdatePayment';

export default function Payment({ config, currentItem }) {
  const payment = currentItem || {};
  const invoice = payment.invoice || {};
  const client = payment.client || invoice.client || {};
  const { moneyFormatter } = useMoney();
  const navigate = useNavigate();
  const format = (amount) => moneyFormatter({ amount: amount || 0, currency_code: payment.currency || invoice.currency });
  return <>
    <PageHeader onBack={() => navigate(`/payment/read/${payment._id}`)} title={`Edit payment #${payment.number || ''}`} description={`Keep the payment details for ${client.name || 'this customer'} up to date.`} extra={invoice._id ? [<Button key="invoice" onClick={() => navigate(`/invoice/read/${invoice._id}`)}>View invoice</Button>] : []} />
    <div className="record-two-columns"><section className="record-form-card"><h2 className="record-section-heading">Payment details</h2><p className="record-section-description">Update the amount, payment method or reference below.</p><UpdatePayment config={config} currentInvoice={payment} /></section><aside className="record-detail-card"><span className="record-eyebrow">Invoice summary</span><h2 className="record-section-heading">{client.name}</h2><div className="record-total-row"><span>Invoice total</span><strong>{format(invoice.total)}</strong></div><div className="record-total-row"><span>Total received</span><strong>{format(invoice.credit)}</strong></div><div className="record-total-row is-total"><span>This payment</span><strong>{format(payment.amount)}</strong></div></aside></div>
  </>;
}
