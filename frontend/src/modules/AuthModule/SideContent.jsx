import useLanguage from '@/locale/useLanguage';
import {
  CubeTransparentIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function SideContent() {
  const translate = useLanguage();

  const features = [
    {
      icon: ChartBarIcon,
      text: 'Real-time analytics & dashboards',
    },
    {
      icon: DocumentTextIcon,
      text: 'Invoice & quote management',
    },
    {
      icon: UsersIcon,
      text: 'Customer relationship tracking',
    },
    {
      icon: ShieldCheckIcon,
      text: 'Secure & role-based access',
    },
  ];

  return (
    <div className="auth-side-content">
      {/* Brand */}
      <div className="auth-brand">
        <div className="auth-brand-icon">
          <CubeTransparentIcon style={{ width: '26px', height: '26px', color: '#fff' }} />
        </div>
        <span className="auth-brand-name">Nexus</span>
      </div>

      {/* Tagline */}
      <h1 className="auth-tagline">
        Manage your business,{' '}
        <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>simplified.</span>
      </h1>

      {/* Description */}
      <p className="auth-description">
        A modern CRM platform for invoicing, quoting, and customer management.
        Built for teams that value clarity and efficiency.
      </p>

      {/* Features */}
      <ul className="auth-features">
        {features.map((feature, index) => (
          <li key={index} className="auth-feature-item">
            <div className="auth-feature-icon">
              <feature.icon />
            </div>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
