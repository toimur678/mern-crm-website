import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Dropdown, Layout } from 'antd';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { FILE_BASE_URL } from '@/config/serverApiConfig';
import useLanguage from '@/locale/useLanguage';
import {
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function HeaderContent() {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { Header } = Layout;
  const translate = useLanguage();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return translate('dashboard');
    return translate(path) || path;
  };

  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div
        onClick={() => navigate('/profile')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 12px',
        }}
      >
        <Avatar
          src={currentAdmin?.photo ? FILE_BASE_URL + currentAdmin?.photo : undefined}
          style={{
            backgroundColor: currentAdmin?.photo ? 'none' : 'var(--color-primary)',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>
            {currentAdmin?.name} {currentAdmin?.surname}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
            {currentAdmin?.email}
          </p>
        </div>
      </div>
    );
  };

  const items = [
    {
      label: <ProfileDropdown />,
      key: 'ProfileDropdown',
    },
    { type: 'divider' },
    {
      icon: <UserIcon style={{ width: 16 }} />,
      key: 'settingProfile',
      label: <Link to={'/profile'}>{translate('profile_settings')}</Link>,
    },
    {
      icon: <Cog6ToothIcon style={{ width: 16 }} />,
      key: 'settingApp',
      label: <Link to={'/settings'}>{translate('app_settings')}</Link>,
    },
    { type: 'divider' },
    {
      icon: <ArrowRightOnRectangleIcon style={{ width: 16 }} />,
      key: 'logout',
      label: <Link to={'/logout'}>{translate('logout')}</Link>,
    },
  ];

  return (
    <Header
      style={{
        padding: '0',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        lineHeight: 'normal',
      }}
    >
      {/* Page title & breadcrumb */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h1 className="page-title" style={{ textTransform: 'capitalize' }}>
          {getPageTitle()}
        </h1>
        <p className="page-breadcrumb">
          {translate('dashboard')}
          <span style={{ color: 'var(--text-tertiary)', margin: '0 2px' }}>/</span>
          <span>{getPageTitle()}</span>
        </p>
      </div>

      {/* User pill */}
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <div className="user-pill">
          <Avatar
            src={currentAdmin?.photo ? FILE_BASE_URL + currentAdmin?.photo : undefined}
            size={36}
            style={{
              backgroundColor: currentAdmin?.photo ? 'transparent' : 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {currentAdmin?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <span className="user-name">{currentAdmin?.name}</span>
          <ChevronDownIcon style={{ width: 14, color: 'var(--text-tertiary)' }} />
        </div>
      </Dropdown>
    </Header>
  );
}
