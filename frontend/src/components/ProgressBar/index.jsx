import React from 'react';

export default function ProgressBar({ value, max = 100, color = 'var(--color-primary)' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--bg-active)',
        borderRadius: 'var(--radius-pill)',
        height: '8px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
          height: '100%',
          borderRadius: 'var(--radius-pill)',
          transition: 'width 0.3s ease',
        }}
      ></div>
    </div>
  );
}
