import { Button, Form, message, Upload } from 'antd';



import useLanguage from '@/locale/useLanguage';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function AppSettingForm() {
  const translate = useLanguage();
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
    }
    return false;
  };
  return (
    <>
      <Form.Item
        name="file"
        label="Logo"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        <Upload
          beforeUpload={beforeUpload}
          listType="picture"
          accept="image/png, image/jpeg"
          maxCount={1}
        >
          <Button icon={<Icon component={ArrowUpTrayIcon} />}>{translate('click_to_upload')}</Button>
        </Upload>
      </Form.Item>
    </>
  );
}
