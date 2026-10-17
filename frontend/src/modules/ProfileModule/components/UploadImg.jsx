import { message, Upload, Form, Button } from 'antd';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function UploadImg() {
  const beforeUpload = (file) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      message.error('Choose a JPG or PNG image.');
      return Upload.LIST_IGNORE;
    }
    if (file.size / 1024 / 1024 >= 2) {
      message.error('Choose an image smaller than 2 MB.');
      return Upload.LIST_IGNORE;
    }
    return false;
  };
  return (
    <Form.Item
      name="file"
      label="Profile photo"
      valuePropName="fileList"
      getValueFromEvent={(event) => event?.fileList}
    >
      <Upload beforeUpload={beforeUpload} accept="image/png,image/jpeg" maxCount={1}>
        <Button icon={<Icon component={ArrowUpTrayIcon} />}>Upload photo</Button>
      </Upload>
    </Form.Item>
  );
}
