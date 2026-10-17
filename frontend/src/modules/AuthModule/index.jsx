import AuthLayout from '@/layout/AuthLayout';
import SideContent from './SideContent';
import { Square3Stack3DIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const descriptions = {
  'Sign in': 'Welcome back. Let’s make today a productive one.',
  'Forget Password': 'Enter your email and we’ll send you a link to reset your password.',
  'Reset Password': 'Choose a new password to keep your workspace secure.',
  'Check your email': 'Your next step is waiting in your inbox.',
};

export default function AuthModule({ authContent, AUTH_TITLE }) {
  const title =
    AUTH_TITLE === 'Sign in'
      ? 'Welcome back'
      : AUTH_TITLE === 'Forget Password'
        ? 'Forgot your password?'
        : AUTH_TITLE;
  return (
    <AuthLayout sideContent={<SideContent />}>
      <div className="auth-form-container">
        <div className="auth-mobile-logo">
          <span className="auth-brand-icon">
            <Square3Stack3DIcon />
          </span>
          <span>
            nexus.<span className="auth-brand-crm">CRM</span>
          </span>
        </div>
        <div className="auth-form-header">
          <span className="auth-eyebrow">YOUR WORKSPACE, CONNECTED</span>
          <h1 className="auth-form-title">{title}</h1>
          <p className="auth-form-subtitle">
            {descriptions[AUTH_TITLE] || 'Everything you need to keep your business moving.'}
          </p>
        </div>
        {authContent}
        <div className="auth-security-note">
          <LockClosedIcon /> A secure space for your business.
        </div>
      </div>
      <footer className="auth-footer">
        Nexus CRM <span>Clarity for every working day.</span>
      </footer>
    </AuthLayout>
  );
}
