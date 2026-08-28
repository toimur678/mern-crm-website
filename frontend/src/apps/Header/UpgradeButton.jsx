import { Avatar, Popover, Button, Badge, Col, List } from 'antd';

// import Notifications from '@/components/Notification';

import { RocketOutlined } from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';

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
        icon={<RocketOutlined />}
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
