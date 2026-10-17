import { Form, Input, InputNumber, Button } from 'antd';
import { useMoney } from '@/settings';
import { TrashIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function ItemRow({ field, remove }) {
  const form = Form.useFormInstance();
  const items = Form.useWatch('items', form);
  const item = items?.[field.name] || {};
  const { moneyFormatter, currency_code, currency_symbol } = useMoney();
  return <div className="record-line-item">
    <Form.Item label="Item" name={[field.name, 'itemName']} rules={[{ required: true, whitespace: true, message: 'Enter an item name' }]}><Input placeholder="Product or service" /></Form.Item>
    <Form.Item label="Description" name={[field.name, 'description']}><Input placeholder="Add a description" /></Form.Item>
    <Form.Item label="Quantity" name={[field.name, 'quantity']} rules={[{ required: true, type: 'number', min: 0.01, message: 'Enter a quantity above zero' }]}><InputNumber min={0.01} aria-label="Quantity" /></Form.Item>
    <Form.Item label="Unit price" name={[field.name, 'price']} rules={[{ required: true }]}><InputNumber min={0} precision={2} controls={false} aria-label="Unit price" prefix={currency_symbol} /></Form.Item>
    <div className="record-line-total">{moneyFormatter({ amount: Number(item.quantity || 0) * Number(item.price || 0), currency_code })}</div>
    <Button type="text" danger aria-label={`Remove line item ${field.name + 1}`} icon={<Icon component={TrashIcon} />} onClick={() => remove(field.name)} />
  </div>;
}
