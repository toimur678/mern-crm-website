import React from 'react';
import useLanguage from '@/locale/useLanguage';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { welcomeData } from '../seedMockData';

export default function WelcomeBanner() {
  const translate = useLanguage();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const name = currentAdmin?.name || 'Admin';

  return (
    <div className="crm-dashboard-card" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      backgroundColor: 'var(--bg-surface)',
    }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{ color: 'var(--color-primary)', margin: '0 0 12px 0', fontSize: '1.25rem', fontWeight: 600 }}>
          {translate('Congratulations')} {name}! 🎉
        </h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
          {translate('You have done')} {welcomeData.salesGrowth}% {translate('more sales today')}.<br />
          {translate('Check your new badge in your profile')}.
        </p>
        <button style={{ 
          color: 'var(--color-primary)', 
          borderColor: 'var(--color-primary)',
          backgroundColor: 'transparent',
          border: '1px solid var(--color-primary)',
          padding: '6px 14px',
          borderRadius: '4px',
          fontWeight: 500,
          cursor: 'pointer'
        }}>
          {translate('View Badges')}
        </button>
      </div>
      <div style={{ position: 'absolute', right: 10, bottom: -10, zIndex: 1 }}>
        <svg width="160" height="150" viewBox="0 0 150 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 130 L55 100 H95 L110 130 Z" fill="#e1e4e8" />
          <rect x="50" y="90" width="50" height="30" fill="#c6cdd3" rx="2" />
          <path d="M75 90 C 75 90, 60 90, 55 110 C 50 130, 50 130, 50 130 H 100 C 100 130, 100 130, 95 110 C 90 90, 75 90, 75 90 Z" fill="var(--color-primary)" />
          <circle cx="75" cy="70" r="15" fill="#f4c3a6" />
          <path d="M60 70 C 60 55, 90 55, 90 70 C 90 60, 60 60, 60 70 Z" fill="#3b4754" />
        </svg>
      </div>
    </div>
  );
}
