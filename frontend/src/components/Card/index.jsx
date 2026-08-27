import React from 'react';

export default function Card({ children, className = '', style = {} }) {
  return (
    <div
      className={`bg-white shadow-diffused p-6 ${className}`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-diffused)',
        padding: '24px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
