import { Form, InputNumber } from 'antd';

const fields = [
  ['last_invoice_number', 'Last invoice number'],
  ['last_quote_number', 'Last quote number'],
  ['last_payment_number', 'Last payment number'],
];
export default function SettingsForm() {
  return (
    <>
      <div className="settings-inline-note">
        New documents continue from these numbers. Existing documents keep their original numbers.
      </div>
      <div className="settings-fields-grid">
        {fields.map(([name, label]) => (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={[{ required: true, message: 'Enter a document number.' }]}
          >
            <InputNumber min={0} precision={0} style={{ width: '100%' }} />
          </Form.Item>
        ))}
      </div>
    </>
  );
}
