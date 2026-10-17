import SetingsSection from '../components/SetingsSection';
import UpdateSettingModule from '../components/UpdateSettingModule';
import SettingsForm from './SettingsForm';
import useLanguage from '@/locale/useLanguage';

export default function MoneyFormatSettingsModule({ config }) {
  const translate = useLanguage();
  return (
    <UpdateSettingModule config={config}>
      <SetingsSection
        title={translate('Currency and formatting')}
        description="Choose how amounts are displayed throughout your workspace."
      >
        <SettingsForm />
      </SetingsSection>
    </UpdateSettingModule>
  );
}
