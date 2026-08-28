import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Tooltip } from 'antd';
import { useAppContext } from '@/context/appContext';
import useLanguage from '@/locale/useLanguage';
import useResponsive from '@/hooks/useResponsive';

import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  CreditCardIcon,
  WalletIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  Bars3Icon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

import {
  HomeIcon as HomeIconSolid,
  UsersIcon as UsersIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  DocumentDuplicateIcon as DocumentDuplicateIconSolid,
  CreditCardIcon as CreditCardIconSolid,
  WalletIcon as WalletIconSolid,
  BanknotesIcon as BanknotesIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  InformationCircleIcon as InformationCircleIconSolid
} from '@heroicons/react/24/solid';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();
  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));
  const translate = useLanguage();
  const navigate = useNavigate();

  const items = [
    { key: 'dashboard', icon: HomeIcon, activeIcon: HomeIconSolid, path: '/' },
    { key: 'customer', icon: UsersIcon, activeIcon: UsersIconSolid, path: '/customer' },
    { key: 'invoice', icon: DocumentTextIcon, activeIcon: DocumentTextIconSolid, path: '/invoice' },
    { key: 'quote', icon: DocumentDuplicateIcon, activeIcon: DocumentDuplicateIconSolid, path: '/quote' },
    { key: 'payment', icon: CreditCardIcon, activeIcon: CreditCardIconSolid, path: '/payment' },
    { key: 'paymentMode', icon: WalletIcon, activeIcon: WalletIconSolid, path: '/payment/mode' },
    { key: 'taxes', icon: BanknotesIcon, activeIcon: BanknotesIconSolid, path: '/taxes' },
  ];

  const bottomItems = [
    { key: 'generalSettings', icon: Cog6ToothIcon, activeIcon: Cog6ToothIconSolid, path: '/settings' },
  ];

  useEffect(() => {
    if (location) {
      if (location.pathname === '/') {
        setCurrentPath('dashboard');
      } else {
        const pathName = location.pathname.slice(1);
        const found = [...items, ...bottomItems].find(i => pathName.startsWith(i.key));
        if (found) setCurrentPath(found.key);
        else setCurrentPath(pathName);
      }
    }
  }, [location.pathname]);

  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      width={isMobile ? 256 : 80}
      style={{
        overflow: 'hidden',
        height: 'calc(100vh - 48px)',
        position: isMobile ? 'absolute' : 'sticky',
        top: '24px',
        margin: isMobile ? '0' : '24px 0 24px 24px',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        backgroundColor: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
      }}
      theme={'light'}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', padding: '24px 0' }}
      >
        {/* Brand icon */}
        <div
          onClick={() => navigate('/')}
          style={{
            cursor: 'pointer',
            marginBottom: '36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(105, 108, 255, 0.25)',
              transition: 'all var(--transition-base)',
            }}
          >
            <CubeTransparentIcon style={{ width: '24px', height: '24px', color: '#fff' }} />
          </div>
          {isMobile && <span style={{ fontWeight: 700, marginTop: '8px', color: 'var(--text-primary)' }}>Nexus</span>}
        </div>

        {/* Main nav items */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center' }}>
          {items.map((item) => {
            const isActive = currentPath === item.key || (item.key === 'dashboard' && currentPath === '');
            const IconComponent = isActive ? item.activeIcon : item.icon;
            return (
              <Tooltip placement="right" title={translate(item.key)} key={item.key}>
                <div
                  onClick={() => navigate(item.path)}
                  className={`nav-icon-btn ${isActive ? 'active' : ''}`}
                  style={{
                    width: isMobile ? 'calc(100% - 24px)' : '48px',
                    height: '48px',
                    borderRadius: isMobile ? 'var(--radius-md)' : '50%',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'flex-start' : 'center',
                    paddingLeft: isMobile ? '16px' : '0',
                    cursor: 'pointer',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    transition: 'all var(--transition-base)',
                  }}
                >
                  <IconComponent style={{ width: '22px', height: '22px', flexShrink: 0 }} />
                  {isMobile && (
                    <span style={{
                      marginLeft: '14px',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '14px',
                      textTransform: 'capitalize',
                    }}>
                      {translate(item.key)}
                    </span>
                  )}
                </div>
              </Tooltip>
            );
          })}
        </div>

        {/* Bottom nav items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center', marginTop: 'auto', paddingTop: '16px' }}>
          {bottomItems.map((item) => {
            const isActive = currentPath === item.key;
            const IconComponent = isActive ? item.activeIcon : item.icon;
            return (
              <Tooltip placement="right" title={translate(item.key)} key={item.key}>
                <div
                  onClick={() => navigate(item.path)}
                  className={`nav-icon-btn ${isActive ? 'active' : ''}`}
                  style={{
                    width: isMobile ? 'calc(100% - 24px)' : '48px',
                    height: '48px',
                    borderRadius: isMobile ? 'var(--radius-md)' : '50%',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'flex-start' : 'center',
                    paddingLeft: isMobile ? '16px' : '0',
                    cursor: 'pointer',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    transition: 'all var(--transition-base)',
                  }}
                >
                  <IconComponent style={{ width: '22px', height: '22px', flexShrink: 0 }} />
                  {isMobile && (
                    <span style={{
                      marginLeft: '14px',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '14px',
                      textTransform: 'capitalize',
                    }}>
                      {translate(item.key)}
                    </span>
                  )}
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25, zIndex: 1000 }}
      >
        <Bars3Icon style={{ width: 24, height: 24 }} />
      </Button>
      <Drawer
        width={280}
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={visible}
        bodyStyle={{ padding: 0 }}
        style={{ borderRadius: '0 var(--radius-card) var(--radius-card) 0' }}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
