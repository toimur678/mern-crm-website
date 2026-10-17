import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Row, Col, DatePicker } from 'antd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import ItemRow from '@/modules/ErpPanelModule/ItemRow';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate, useMoney } from '@/settings';
import { useSelector } from 'react-redux';
import { request } from '@/request';
import { PlusIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function InvoiceForm({ subTotal = 0, current = null }) {
  const { last_invoice_number } = useSelector(selectFinanceSettings);
  const { dateFormat } = useDate();
  const { moneyFormatter, currency_code } = useMoney();
  const form = Form.useFormInstance();
  const taxRate = Form.useWatch('taxRate', form) || 0;
  useEffect(() => { if (!current && last_invoice_number !== undefined && !form.isFieldTouched('number')) form.setFieldValue('number', Number(last_invoice_number || 0) + 1); }, [last_invoice_number, current, form]);
  const [taxes, setTaxes] = useState([]);
  useEffect(() => { let active = true; request.list({ entity: 'taxes', options: { items: 100 } }).then((response) => { if (active && response?.success) setTaxes((response.result || []).filter((tax) => tax.enabled)); }); return () => { active = false; }; }, []);
  const format = (amount) => moneyFormatter({ amount, currency_code: current?.currency || currency_code });
  const taxTotal = subTotal * Number(taxRate) / 100;
  return <>
    <section className="record-form-section">
      <h2 className="record-section-heading">Invoice details</h2>
      <p className="record-section-description">Choose a customer, set the dates, and make it yours.</p>
      <Row gutter={[20, 0]}>
        <Col xs={24} md={12}><Form.Item name="client" label="Customer" rules={[{ required: true, message: 'Choose a customer' }]}><AutoCompleteAsync entity="client" displayLabels={['name']} searchFields="name" redirectLabel="Add customer" withRedirect urlToRedirect="/customer" /></Form.Item></Col>
        <Col xs={12} md={6}><Form.Item label="Invoice number" name="number" initialValue={Number(last_invoice_number || 0) + 1} rules={[{ required: true }]}><InputNumber min={1} precision={0} style={{ width: '100%' }} /></Form.Item></Col>
        <Col xs={12} md={6}><Form.Item label="Year" name="year" initialValue={new Date().getFullYear()} rules={[{ required: true }]}><InputNumber min={1900} max={9999} precision={0} style={{ width: '100%' }} /></Form.Item></Col>
        <Col xs={24} md={8}><Form.Item label="Status" name="status" initialValue="draft" rules={[{ required: true }]}><Select options={[{ value: 'draft', label: 'Draft' }, { value: 'pending', label: 'Pending' }, { value: 'sent', label: 'Sent' }, { value: 'cancelled', label: 'Cancelled' }, { value: 'on hold', label: 'On hold' }, { value: 'refunded', label: 'Refunded' }]} /></Form.Item></Col>
        <Col xs={12} md={8}><Form.Item name="date" label="Invoice date" initialValue={dayjs()} rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} format={dateFormat} /></Form.Item></Col>
        <Col xs={12} md={8}><Form.Item name="expiredDate" label="Due date" initialValue={dayjs().add(30, 'days')} rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} format={dateFormat} /></Form.Item></Col>
      </Row>
    </section>
    <section className="record-form-section">
      <h2 className="record-section-heading">What are you billing for?</h2>
      <p className="record-section-description">Add the products or services included in this invoice.</p>
      <div className="record-line-header"><span>Item</span><span>Description</span><span>Quantity</span><span>Unit price</span><span style={{ textAlign: 'right' }}>Amount</span><span /></div>
      <Form.List name="items" initialValue={[{ quantity: 1, price: 0 }]} rules={[{ validator: (_, items) => items?.length ? Promise.resolve() : Promise.reject(new Error('Add at least one line item')) }]}>
        {(fields, { add, remove }, { errors }) => <>{fields.map((field) => <ItemRow key={field.key} field={field} remove={remove} current={current} />)}<Form.ErrorList errors={errors} /><Button type="dashed" icon={<Icon component={PlusIcon} />} onClick={() => add({ quantity: 1, price: 0 })}>Add line item</Button></>}
      </Form.List>
    </section>
    <div className="record-invoice-summary"><div className="record-invoice-summary-inner">
      <div className="record-total-row"><span>Subtotal</span><strong>{format(subTotal)}</strong></div>
      <Form.Item label="Tax rate" name="taxRate" initialValue={0} rules={[{ required: true }]}><Select options={[{ value: 0, label: 'No tax (0%)' }, ...taxes.filter((tax) => tax.taxValue !== 0).map((tax) => ({ value: tax.taxValue, label: `${tax.taxName} (${tax.taxValue}%)` })), ...(current?.taxRate && !taxes.some((tax) => tax.taxValue === current.taxRate) ? [{ value: current.taxRate, label: `${current.taxRate}%` }] : [])]} /></Form.Item>
      <div className="record-total-row"><span>Tax amount</span><strong>{format(taxTotal)}</strong></div>
      <div className="record-total-row is-total"><span>Total</span><strong>{format(subTotal + taxTotal)}</strong></div>
    </div></div>
    <Form.Item label="Notes for your customer" name="notes" style={{ marginTop: 24 }}><Input.TextArea rows={3} placeholder="Payment terms, a thank you, or any details that matter…" /></Form.Item>
    <div className="record-form-actions"><Button type="primary" htmlType="submit">{current ? 'Save changes' : 'Create invoice'}</Button></div>
  </>;
}
