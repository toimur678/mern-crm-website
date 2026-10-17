import { Form, Input, Select, Row, Col } from 'antd';
import { countryList } from '@/utils/countryList';

export default function CustomerForm() {
  return <>
    <Form.Item name="name" label="Customer name" rules={[{ required: true, whitespace: true, message: 'Enter a customer or company name' }]}><Input placeholder="e.g. Acme Studio" autoComplete="organization" /></Form.Item>
    <Row gutter={16}>
      <Col xs={24} sm={12}><Form.Item name="email" label="Email address" rules={[{ type: 'email', message: 'Enter a valid email address' }]}><Input type="email" placeholder="hello@company.com" autoComplete="email" /></Form.Item></Col>
      <Col xs={24} sm={12}><Form.Item name="phone" label="Phone number"><Input type="tel" placeholder="+1 555 000 0000" autoComplete="tel" /></Form.Item></Col>
    </Row>
    <Form.Item name="address" label="Address"><Input.TextArea rows={2} placeholder="Street address, city and postal code" autoComplete="street-address" /></Form.Item>
    <Form.Item name="country" label="Country"><Select showSearch allowClear placeholder="Choose a country" optionFilterProp="label" options={countryList.map((country) => ({ value: country.value, label: `${country.icon || ''} ${country.label}`.trim() }))} /></Form.Item>
  </>;
}
