import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div
      className="dashboardSpacing"
      style={{
        width: '100%',
        maxWidth: '1400px',
      }}
    >
      {children}
    </div>
  );
}
