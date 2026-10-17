import { Form, Input } from 'antd';
import { LockClosedIcon } from '@heroicons/react/24/outline';

export default function ResetPasswordForm() {
  return (
    <>
      <Form.Item
        label="New password"
        name="password"
        extra="Use at least 8 characters."
        rules={[
          { required: true, message: 'Enter a new password.' },
          { min: 8, message: 'Use at least 8 characters.' },
        ]}
      >
        <Input.Password
          prefix={<LockClosedIcon />}
          placeholder="Create a strong password"
          autoComplete="new-password"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label="Confirm password"
        name="confirm_password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Confirm your new password.' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              return !value || getFieldValue('password') === value
                ? Promise.resolve()
                : Promise.reject(new Error('Your passwords do not match.'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockClosedIcon />}
          placeholder="Enter your password again"
          autoComplete="new-password"
          size="large"
        />
      </Form.Item>
    </>
  );
}
