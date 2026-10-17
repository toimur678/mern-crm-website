import {
  ComputerDesktopIcon,
  Cog6ToothIcon,
  PhoneIcon,
  DocumentTextIcon,
  ArrowPathRoundedSquareIcon,
  Squares2X2Icon,
  UsersIcon,
  UserIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export const IconMenu = ({ name }) => {
  const elements = {
    DesktopOutlined: ComputerDesktopIcon,
    SettingOutlined: Cog6ToothIcon,
    CustomerServiceOutlined: PhoneIcon,
    FileTextOutlined: DocumentTextIcon,
    FileSyncOutlined: ArrowPathRoundedSquareIcon,
    DashboardOutlined: Squares2X2Icon,
    TeamOutlined: UsersIcon,
    UserOutlined: UserIcon,
    CreditCardOutlined: CreditCardIcon,
    BankOutlined: BuildingLibraryIcon,
    Default: ComputerDesktopIcon,
  };

  const IconTag = elements[name || 'Default'] || Cog6ToothIcon;
  return <Icon component={IconTag} />;
};
