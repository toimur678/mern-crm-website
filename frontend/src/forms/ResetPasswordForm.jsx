import React from 'react';
import { Form, Input } from 'antd';


import useLanguage from '@/locale/useLanguage';
import { UserIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function ResetPasswordForm() {
  return (
    <>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          prefix={<Icon component={LockClosedIcon} className="site-form-item-icon" />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<Icon component={LockClosedIcon} className="site-form-item-icon" />}
          placeholder="Confirm password"
          size="large"
        />
      </Form.Item>
    </>
  );
}
