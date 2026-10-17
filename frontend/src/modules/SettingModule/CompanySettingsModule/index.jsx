import SetingsSection from '../components/SetingsSection';
import UpdateSettingModule from '../components/UpdateSettingModule';
import SettingsForm from './SettingsForm';
import useLanguage from '@/locale/useLanguage';

export default function CompanySettingsModule({ config }) {
  const translate = useLanguage();
  return (
    <UpdateSettingModule config={config}>
      <SetingsSection
        title={translate('Company Settings')}
        description="The business details that appear on your invoices and quotes."
      >
        <SettingsForm />
      </SetingsSection>
    </UpdateSettingModule>
  );
}
