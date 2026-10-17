import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingsAction } from '@/redux/settings/actions';
import { selectSettings } from '@/redux/settings/selectors';
import { Button, Form, notification } from 'antd';
import { CheckIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function UpdateSettingForm({ config, children, withUpload, uploadSettingKey }) {
  const { entity, settingsCategory } = config;
  const dispatch = useDispatch();
  const { result, isLoading } = useSelector(selectSettings);
  const [form] = Form.useForm();
  const current = result?.[settingsCategory];
  useEffect(() => {
    form.setFieldsValue(current || {});
  }, [current, form]);
  const onSubmit = (values) => {
    if (withUpload) {
      const file = values.file?.[0]?.originFileObj;
      if (!file) {
        notification.error({ message: 'Choose a logo to upload.' });
        return;
      }
      dispatch(
        settingsAction.upload({
          entity,
          settingKey: uploadSettingKey,
          jsonData: { ...values, file },
        })
      );
    } else {
      const settings = Object.entries(values).map(([settingKey, settingValue]) => ({
        settingKey,
        settingValue,
      }));
      dispatch(settingsAction.updateMany({ entity, jsonData: { settings } }));
    }
  };
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      className="settings-form"
      requiredMark={false}
      disabled={isLoading}
    >
      <div className="settings-form-body">{children}</div>
      <footer className="settings-form-footer">
        <span>Changes apply across your workspace.</span>
        <div>
          <Button
            onClick={() => {
              form.resetFields();
              form.setFieldsValue(current || {});
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            icon={<Icon component={CheckIcon} />}
          >
            Save changes
          </Button>
        </div>
      </footer>
    </Form>
  );
}
