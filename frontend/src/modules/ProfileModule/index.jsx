import Profile from './components/Profile';
import ProfileLayout from '@/layout/ProfileLayout';

export default function ProfileModule({ config }) {
  return (
    <ProfileLayout>
      <main className="profile-shell">
        <Profile config={config} />
      </main>
    </ProfileLayout>
  );
}
