import { Form, Input } from 'antd';

const fields = [
  ['company_name', 'Company name', 'Your company name', 'organization'],
  ['company_email', 'Email address', 'hello@company.com', 'email'],
  ['company_phone', 'Phone number', '+1 (555) 000-0000', 'tel'],
  ['company_website', 'Website', 'https://company.com', 'url'],
  ['company_address', 'Street address', 'Street and building', 'street-address'],
  ['company_state', 'State / region', 'State or region', 'address-level1'],
  ['company_country', 'Country', 'Country', 'country-name'],
  ['company_tax_number', 'Tax number', 'Tax identification number', 'off'],
  ['company_vat_number', 'VAT number', 'VAT registration number', 'off'],
  ['company_reg_number', 'Registration number', 'Business registration number', 'off'],
];
export default function SettingsForm() {
  return (
    <div className="settings-fields-grid">
      {fields.map(([name, label, placeholder, autoComplete]) => (
        <Form.Item
          key={name}
          name={name}
          label={label}
          rules={
            name === 'company_email'
              ? [{ type: 'email', message: 'Enter a valid email address.' }]
              : []
          }
        >
          <Input
            placeholder={placeholder}
            autoComplete={autoComplete}
            type={name === 'company_email' ? 'email' : name === 'company_phone' ? 'tel' : 'text'}
          />
        </Form.Item>
      ))}
    </div>
  );
}
