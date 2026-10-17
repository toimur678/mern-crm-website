import { Form, Input, Upload, Button, message } from 'antd';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

const beforeUpload = (file) => {
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    message.error('Choose a JPG or PNG image.');
    return Upload.LIST_IGNORE;
  }
  if (file.size / 1024 / 1024 >= 5) {
    message.error('Choose an image smaller than 5 MB.');
    return Upload.LIST_IGNORE;
  }
  return false;
};
export default function ProfileAdminForm() {
  return (
    <div className="settings-fields-grid">
      <Form.Item
        label="First name"
        name="name"
        rules={[{ required: true, whitespace: true, message: 'Enter your first name.' }]}
      >
        <Input autoComplete="given-name" placeholder="First name" />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="surname"
        rules={[{ required: true, whitespace: true, message: 'Enter your last name.' }]}
      >
        <Input autoComplete="family-name" placeholder="Last name" />
      </Form.Item>
      <Form.Item
        label="Email address"
        name="email"
        rules={[
          { required: true, message: 'Enter your email address.' },
          { type: 'email', message: 'Enter a valid email address.' },
        ]}
      >
        <Input autoComplete="email" type="email" placeholder="you@company.com" />
      </Form.Item>
      <Form.Item
        name="file"
        label="Profile photo"
        valuePropName="fileList"
        getValueFromEvent={(event) => event?.fileList}
        extra="JPG or PNG, up to 5 MB."
      >
        <Upload
          beforeUpload={beforeUpload}
          listType="picture"
          accept="image/png,image/jpeg"
          maxCount={1}
        >
          <Button icon={<Icon component={ArrowUpTrayIcon} />}>Upload photo</Button>
        </Upload>
      </Form.Item>
    </div>
  );
}
