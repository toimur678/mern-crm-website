import React from 'react';
import { Form, Input } from 'antd';

import useLanguage from '@/locale/useLanguage';

// import useLanguage from '@/locale/useLanguage';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function ForgetPasswordForm() {
  const translate=useLanguage()
  return (
    <Form.Item
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
        prefix={<Icon component={EnvelopeIcon} className="site-form-item-icon" />}
        type="email"
        placeholder={translate('email')}
        size="large"
      />
    </Form.Item>
  );
}
