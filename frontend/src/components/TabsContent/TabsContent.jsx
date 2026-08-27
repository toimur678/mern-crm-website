import React, { useState } from 'react';
import { Row, Col } from 'antd';

const SettingsLayout = ({ children }) => {
  return (
    <Col className="gutter-row" span={24} order={0}>
      <div className="bg-white shadow-diffused rounded-[24px]" style={{ minHeight: '480px', padding: '24px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-diffused)' }}>
        {children}
      </div>
    </Col>
  );
};

export default function TabsContent({ content, defaultActiveKey, pageTitle }) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || (content[0] ? content[0].key || '0' : ''));

  const activeContent = content.find(
    (item, index) => (item.key ? item.key : index + '_' + item.label.replace(/ /g, '_')) === activeKey
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {pageTitle && (
        <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '20px', fontWeight: 700 }}>
          {pageTitle}
        </h2>
      )}
      
      <div
        style={{
          display: 'inline-flex',
          backgroundColor: 'var(--bg-active)',
          padding: '4px',
          borderRadius: 'var(--radius-pill)',
          width: 'fit-content',
        }}
      >
        {content.map((item, index) => {
          const key = item.key ? item.key : index + '_' + item.label.replace(/ /g, '_');
          const isActive = key === activeKey;
          
          return (
            <div
              key={key}
              onClick={() => setActiveKey(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 24px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                boxShadow: isActive ? 'var(--shadow-diffused)' : 'none',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <Row gutter={[24, 24]}>
        {activeContent && <SettingsLayout>{activeContent.children}</SettingsLayout>}
      </Row>
    </div>
  );
}
