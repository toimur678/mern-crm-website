import React from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{
        margin: '0 auto',
        width: '100%',
        maxWidth: '1200px',
      }}
    >
      {children}
    </div>
  );
}
