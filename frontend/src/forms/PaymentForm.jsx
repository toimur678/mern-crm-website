import dayjs from 'dayjs';
import { Form, Input, InputNumber, DatePicker, Row, Col } from 'antd';
import SelectAsync from '@/components/SelectAsync';
import { useMoney, useDate } from '@/settings';

export default function PaymentForm({ maxAmount = null }) {
  const money = useMoney();
  const { dateFormat } = useDate();
  return <>
    <Row gutter={16}>
      <Col xs={24} sm={12}><Form.Item label="Payment number" name="number" initialValue={1} rules={[{ required: true }]}><InputNumber min={1} precision={0} style={{ width: '100%' }} /></Form.Item></Col>
      <Col xs={24} sm={12}><Form.Item name="date" label="Payment date" initialValue={dayjs()} rules={[{ required: true }]}><DatePicker format={dateFormat} style={{ width: '100%' }} /></Form.Item></Col>
    </Row>
    <Form.Item label="Amount received" name="amount" rules={[{ required: true, message: 'Enter the payment amount' }, { type: 'number', min: 0.01, ...(maxAmount !== null ? { max: maxAmount } : {}), message: 'Enter a positive amount within the remaining balance' }]}><InputNumber className="moneyInput" min={0.01} max={maxAmount ?? undefined} precision={2} controls={false} addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined} addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined} /></Form.Item>
    <Form.Item label="Payment method" name="paymentMode" rules={[{ required: true, message: 'Choose a payment method' }]}><SelectAsync entity="paymentMode" displayLabels={['name']} withRedirect urlToRedirect="/payment/mode" redirectLabel="Add payment method" placeholder="Choose a payment method" /></Form.Item>
    <Form.Item label="Reference" name="ref"><Input placeholder="Transaction ID or transfer reference" /></Form.Item>
    <Form.Item label="Notes" name="description"><Input.TextArea rows={3} placeholder="Any details about this payment" /></Form.Item>
  </>;
}
