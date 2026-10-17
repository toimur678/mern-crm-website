import { useState } from 'react';
import { useProfileContext } from '@/context/profileContext';
import { request } from '@/request';
import { Form, Input, Modal } from 'antd';

export default function PasswordModal() {
  const { state, profileContextAction } = useProfileContext();
  const { modal } = profileContextAction;
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);
  const onSubmit = async (values) => {
    setIsSaving(true);
    try {
      const response = await request.patch({ entity: 'admin/profile/password', jsonData: values });
      if (response?.success) {
        form.resetFields();
        modal.close();
      }
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <Modal
      title="Update your password"
      className="profile-password-modal"
      open={state.passwordModal.isOpen}
      onCancel={() => {
        if (!isSaving) {
          form.resetFields();
          modal.close();
        }
      }}
      okText="Update password"
      confirmLoading={isSaving}
      cancelButtonProps={{ disabled: isSaving }}
      closable={!isSaving}
      maskClosable={!isSaving}
      onOk={() => form.submit()}
    >
      <p className="profile-modal-description">Choose a strong password you haven’t used before.</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
        disabled={isSaving}
      >
        <Form.Item
          label="New password"
          name="password"
          extra="Use at least 8 characters."
          rules={[
            { required: true, message: 'Enter a new password.' },
            { min: 8, message: 'Use at least 8 characters.' },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="passwordCheck"
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
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
