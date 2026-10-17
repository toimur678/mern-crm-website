import { Form, Input, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  return (
    <>
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
          placeholder="you@company.com"
          type="email"
          autoComplete="username"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Enter your password.' }]}
      >
        <Input.Password
          prefix={<LockClosedIcon />}
          placeholder="Enter your password"
          autoComplete="current-password"
          size="large"
        />
      </Form.Item>
      <div className="auth-form-options">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link to="/forgetpassword">Forgot password?</Link>
      </div>
    </>
  );
}
