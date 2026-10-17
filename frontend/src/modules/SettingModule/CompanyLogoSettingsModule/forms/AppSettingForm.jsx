import { Form, message, Upload } from 'antd';
import { ArrowUpTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectCompanySettings } from '@/redux/settings/selectors';
import { FILE_BASE_URL } from '@/config/serverApiConfig';

export default function AppSettingForm() {
  const company = useSelector(selectCompanySettings);
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
  return (
    <div className="settings-logo-layout">
      <div className="settings-logo-preview">
        {company?.company_logo ? (
          <img src={FILE_BASE_URL + company.company_logo} alt="Current company logo" />
        ) : (
          <PhotoIcon />
        )}
        <span>Current logo</span>
      </div>
      <Form.Item
        name="file"
        label="Upload a new logo"
        valuePropName="fileList"
        getValueFromEvent={(event) => event?.fileList}
        rules={[{ required: true, message: 'Choose a logo to upload.' }]}
        extra="PNG or JPG, up to 5 MB. A square image works best."
      >
        <Upload.Dragger
          beforeUpload={beforeUpload}
          listType="picture"
          accept="image/png,image/jpeg"
          maxCount={1}
        >
          <ArrowUpTrayIcon className="settings-upload-icon" />
          <p>Click to upload or drag and drop</p>
          <span>Give your documents a familiar face.</span>
        </Upload.Dragger>
      </Form.Item>
    </div>
  );
}
