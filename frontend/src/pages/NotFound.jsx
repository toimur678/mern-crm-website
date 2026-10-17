import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { MapIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function NotFoundPage() {
  return (
    <main className="settings-empty-page">
      <span className="settings-empty-icon">
        <MapIcon />
      </span>
      <span className="settings-eyebrow">404 · PAGE NOT FOUND</span>
      <h1>A little off the map.</h1>
      <p>
        This page may have moved, or the link may be out of date.
        <br />
        Your workspace is right where you left it.
      </p>
      <Link to="/">
        <Button type="primary" icon={<Icon component={ArrowLeftIcon} />}>
          Back to dashboard
        </Button>
      </Link>
    </main>
  );
}
