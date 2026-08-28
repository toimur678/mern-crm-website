import { Avatar, Popover, Button, Badge, Col, List } from 'antd';

// import Notifications from '@/components/Notification';



import useLanguage from '@/locale/useLanguage';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function UpgradeButton() {
  const translate = useLanguage();

  return (
    <Badge count={1} size="small">
      <Button
        type="primary"
        style={{
          float: 'right',
          marginTop: '5px',
          cursor: 'pointer',
          background: 'var(--color-success)',
          boxShadow: '0 2px 8px rgba(113, 221, 55, 0.3)',
        }}
        icon={<Icon component={RocketLaunchIcon} />}
        onClick={() => {
          window.open(`https://entreprise.idurarapp.com`);
        }}
      >
        {translate('Try Entreprise Version')}
      </Button>
    </Badge>
  );
}

console.log(

);
