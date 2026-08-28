import { ComputerDesktopIcon, Cog6ToothIcon, PhoneIcon, DocumentTextIcon, ArrowPathRoundedSquareIcon, Squares2X2Icon, UsersIcon, UserIcon, CreditCardIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';


export const IconMenu = ({ name }) => {
  const elements = {
    DesktopOutlined: DesktopOutlined,
    SettingOutlined: SettingOutlined,
    CustomerServiceOutlined: CustomerServiceOutlined,
    FileTextOutlined: FileTextOutlined,
    FileSyncOutlined: FileSyncOutlined,
    DashboardOutlined: DashboardOutlined,
    TeamOutlined: TeamOutlined,
    UserOutlined: UserOutlined,
    CreditCardOutlined: CreditCardOutlined,
    BankOutlined: BankOutlined,
    Default: DesktopOutlined,
  };

  const IconTag = elements[name || 'Default'] || SettingOutlined;
  return <IconTag />;
};
