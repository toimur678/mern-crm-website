import { useEffect, useState } from 'react';
import { useProfileContext } from '@/context/profileContext';
import { Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ProfileAdminForm from './ProfileAdminForm';
import { updateProfile } from '@/redux/auth/actions';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function UpdateAdmin() {
  const { profileContextAction } = useProfileContext();
  const { updatePanel } = profileContextAction;
  const dispatch = useDispatch();
  const admin = useSelector(selectCurrentAdmin);
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    form.setFieldsValue({ ...admin, file: undefined });
  }, [admin, form]);
  const onSubmit = async (values) => {
    const data = { ...values };
    if (data.file?.[0]?.originFileObj) data.file = data.file[0].originFileObj;
    else delete data.file;
    setIsSaving(true);
    try {
      await dispatch(updateProfile({ entity: 'admin/profile', jsonData: data }));
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <>
      <header className="profile-page-header">
        <div>
          <span className="settings-eyebrow">PERSONAL WORKSPACE</span>
          <h1>Edit profile</h1>
          <p>Keep your personal information up to date.</p>
        </div>
        <Button
          icon={<Icon component={ArrowLeftIcon} />}
          onClick={updatePanel.close}
          disabled={isSaving}
        >
          Back to profile
        </Button>
      </header>
      <section className="profile-edit-card">
        <div className="settings-section-header">
          <h2>Personal information</h2>
          <p>Your name and photo help your team recognize you.</p>
        </div>
        <Form
          form={form}
          onFinish={onSubmit}
          layout="vertical"
          requiredMark={false}
          disabled={isSaving}
        >
          <ProfileAdminForm />
          <div className="profile-edit-footer">
            <Button
              onClick={() => {
                form.resetFields();
                form.setFieldsValue({ ...admin, file: undefined });
                updatePanel.close();
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<Icon component={CheckIcon} />}
              loading={isSaving}
            >
              Save changes
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
}
