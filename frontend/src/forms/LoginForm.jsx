import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

import useLanguage from '@/locale/useLanguage';

export default function LoginForm() {
  const translate = useLanguage();
  return (
    <div>
      <Form.Item
        label={translate('email')}
        name="email"
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
          },
        ]}
      >
        <Input
          prefix={<EnvelopeIcon style={{ width: '18px', height: '18px', color: 'var(--text-tertiary)' }} />}
          placeholder={'admin@admin.com'}
          type="email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label={translate('password')}
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          prefix={<LockClosedIcon style={{ width: '18px', height: '18px', color: 'var(--text-tertiary)' }} />}
          placeholder={'••••••••'}
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{translate('Remember me')}</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="/forgetpassword">
            {translate('Forgot password')}
          </a>
        </div>
      </Form.Item>
    </div>
  );
}
