import useLanguage from '@/locale/useLanguage';
import { Layout, Col } from 'antd';
import AuthLayout from '@/layout/AuthLayout';
import SideContent from './SideContent';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';

const { Content } = Layout;

const AuthModule = ({ authContent, AUTH_TITLE, isForRegistre = false }) => {
  const translate = useLanguage();
  return (
    <AuthLayout sideContent={<SideContent />}>
      <div className="auth-form-container">
        {/* Mobile-only logo */}
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
          <div className="auth-mobile-logo">
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--color-primary)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CubeTransparentIcon style={{ width: '22px', height: '22px', color: '#fff' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>Nexus</span>
          </div>
        </Col>

        {/* Form header */}
        <div className="auth-form-header">
          <h1 className="auth-form-title">{translate(AUTH_TITLE)}</h1>
          <p className="auth-form-subtitle">
            {AUTH_TITLE === 'Sign in'
              ? translate('Enter your credentials to access your account')
              : translate(AUTH_TITLE)
            }
          </p>
        </div>

        {/* Form content */}
        <div className="site-layout-content">{authContent}</div>
      </div>
    </AuthLayout>
  );
};

export default AuthModule;
