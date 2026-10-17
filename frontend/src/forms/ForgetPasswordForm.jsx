import { Form, Input } from 'antd';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ForgetPasswordForm() {
  return (
    <Form.Item
      label="Email address"
      name="email"
      rules={[
        { required: true, message: 'Enter your email address.' },
        { type: 'email', message: 'Enter a valid email address.' },
      ]}
    >
      <Input
        prefix={<EnvelopeIcon />}
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        size="large"
      />
    </Form.Item>
  );
}
