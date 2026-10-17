import { useProfileContext } from '@/context/profileContext';
import { Avatar, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { FILE_BASE_URL } from '@/config/serverApiConfig';
import {
  PencilSquareIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function AdminInfo() {
  const navigate = useNavigate();
  const { profileContextAction } = useProfileContext();
  const { modal, updatePanel } = profileContextAction;
  const admin = useSelector(selectCurrentAdmin);
  const fullName = [admin?.name, admin?.surname].filter(Boolean).join(' ') || 'Your account';
  const initials =
    `${admin?.name?.charAt(0) || ''}${admin?.surname?.charAt(0) || ''}`.toUpperCase() || 'N';
  return (
    <>
      <header className="profile-page-header">
        <div>
          <span className="settings-eyebrow">PERSONAL WORKSPACE</span>
          <h1>Your profile</h1>
          <p>A few details that make this workspace yours.</p>
        </div>
        <Button
          type="primary"
          icon={<Icon component={PencilSquareIcon} />}
          onClick={updatePanel.open}
        >
          Edit profile
        </Button>
      </header>
      <div className="profile-overview-grid">
        <section className="profile-identity-card">
          <div className="profile-cover" />
          <Avatar
            className="profile-avatar"
            src={admin?.photo ? (FILE_BASE_URL || '') + admin.photo : undefined}
            size={88}
            alt={fullName}
          >
            {initials}
          </Avatar>
          <h2>{fullName}</h2>
          <p>{admin?.email || 'No email address added'}</p>
          <span className="profile-role">
            <ShieldCheckIcon />
            {admin?.role || 'Team member'}
          </span>
          <div className="profile-identity-caption">Your Nexus workspace account</div>
        </section>
        <section className="profile-details-card">
          <div className="profile-card-heading">
            <span className="profile-section-icon">
              <UserCircleIcon />
            </span>
            <div>
              <h2>Account details</h2>
              <p>How you appear across your workspace.</p>
            </div>
          </div>
          <dl className="profile-details-list">
            <div>
              <dt>First name</dt>
              <dd>{admin?.name || '—'}</dd>
            </div>
            <div>
              <dt>Last name</dt>
              <dd>{admin?.surname || '—'}</dd>
            </div>
            <div>
              <dt>
                <EnvelopeIcon />
                Email address
              </dt>
              <dd>{admin?.email || '—'}</dd>
            </div>
            <div>
              <dt>Account role</dt>
              <dd className="profile-role-value">{admin?.role || '—'}</dd>
            </div>
          </dl>
        </section>
      </div>
      <section className="profile-security-card">
        <div className="profile-card-heading">
          <span className="profile-section-icon">
            <LockClosedIcon />
          </span>
          <div>
            <h2>Password and security</h2>
            <p>A strong password helps protect your business.</p>
          </div>
        </div>
        <Button onClick={modal.open}>Update password</Button>
      </section>
      <footer className="profile-footer">
        <span>Finished for now? You can safely sign out.</span>
        <Button
          icon={<Icon component={ArrowRightOnRectangleIcon} />}
          onClick={() => navigate('/logout')}
        >
          Sign out
        </Button>
      </footer>
    </>
  );
}
