import React from 'react';
import { Switch, Form, Input } from 'antd';

import useLanguage from '@/locale/useLanguage';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function PaymentModeForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  return (
    <>
      <Form.Item
        label={translate('Payment Mode')}
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('Description')}
        name="description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={translate('enabled')}
        name="enabled"
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px',
        }}
        valuePropName="checked"
        initialValue={true}
      >
        <Switch checkedChildren={<Icon component={CheckIcon} />} unCheckedChildren={<Icon component={XMarkIcon} />} />
      </Form.Item>
      <Form.Item
        label={translate('Default Mode')}
        name="isDefault"
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingLeft: '5px',
        }}
        valuePropName="checked"
      >
        <Switch checkedChildren={<Icon component={CheckIcon} />} unCheckedChildren={<Icon component={XMarkIcon} />} />
      </Form.Item>
    </>
  );
}
