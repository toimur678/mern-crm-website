import { Col, Divider, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

export default function SetingsSection({ title, description, children }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: 'var(--text-primary)' }}>{title}</Title>
        <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>{description}</Text>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
