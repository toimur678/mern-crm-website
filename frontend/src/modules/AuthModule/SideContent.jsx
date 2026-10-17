import {
  Square3Stack3DIcon,
  ArrowUpRightIcon,
  CheckIcon,
  DocumentTextIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

export default function SideContent() {
  return (
    <div className="auth-side-content">
      <div className="auth-brand">
        <span className="auth-brand-icon">
          <Square3Stack3DIcon />
        </span>
        <span className="auth-brand-name">
          nexus.<span className="auth-brand-crm">CRM</span>
        </span>
      </div>
      <div className="auth-story">
        <span className="auth-story-eyebrow">
          <span /> A little more connected.
        </span>
        <h2 className="auth-tagline">
          Good relationships.
          <br />
          <span>Great business.</span>
        </h2>
        <p className="auth-description">
          Bring your customers, invoices, and everyday work together. Make room for what comes next.
        </p>
        <div className="auth-preview" aria-hidden="true">
          <div className="auth-preview-header">
            <span className="auth-preview-dot" />
            <span>Business at a glance</span>
            <span className="auth-preview-more">EXAMPLE WORKSPACE</span>
          </div>
          <div className="auth-preview-metric">
            <div>
              <span>Total revenue</span>
              <strong>
                $24,580<span>.00</span>
              </strong>
            </div>
            <span className="auth-preview-growth">
              <ArrowUpRightIcon /> 12.8%
            </span>
          </div>
          <div className="auth-preview-chart">
            {[34, 48, 42, 67, 52, 76, 70, 92, 82, 100, 90, 116].map((height, index) => (
              <span key={index} style={{ height }} />
            ))}
          </div>
          <div className="auth-preview-months">
            <span>JAN</span>
            <span>FEB</span>
            <span>MAR</span>
            <span>APR</span>
            <span>MAY</span>
            <span>JUN</span>
          </div>
          <div className="auth-preview-bottom">
            <span>
              <UsersIcon /> Customers connected
            </span>
            <span>
              <CheckIcon /> All in one place
            </span>
          </div>
          <div className="auth-preview-floating">
            <span className="auth-preview-document">
              <DocumentTextIcon />
            </span>
            <div>
              <strong>One less thing to chase.</strong>
              <span>Keep every invoice in view.</span>
            </div>
            <span className="auth-preview-check">
              <CheckIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="auth-side-footer">
        <span className="auth-side-footer-mark">✳</span>
        <span>Less busywork. More possibility.</span>
      </div>
    </div>
  );
}
