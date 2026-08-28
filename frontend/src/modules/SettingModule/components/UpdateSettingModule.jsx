// import { generate as uniqueId } from 'shortid';
// 
import { Divider } from 'antd';
import PageHeader from '@/components/PageHeader';
import UpdateSettingForm from './UpdateSettingForm';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function UpdateSettingModule({
  config,
  children,
  withUpload = false,
  uploadSettingKey = null,
}) {
  return (
    <div style={{ padding: '24px' }}>
      <UpdateSettingForm
        config={config}
        withUpload={withUpload}
        uploadSettingKey={uploadSettingKey}
      >
        {children}
      </UpdateSettingForm>
    </div>
  );
}
