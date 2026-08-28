import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function PageHeader({
  title,
  subTitle,
  onBack,
  backIcon,
  tags,
  extra,
  ghost,
  style,
  children,
}) {
  return (
    <div
      className={ghost ? '' : 'crm-dashboard-card'}
      style={{
        padding: ghost ? '20px 0px' : '24px',
        backgroundColor: ghost ? 'transparent' : 'var(--bg-surface, #ffffff)',
        borderRadius: ghost ? '0' : '10px',
        boxShadow: ghost ? 'none' : '0 2px 6px 0 rgba(67, 89, 113, 0.12)',
        marginBottom: '24px',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {onBack && (
            <div
              onClick={onBack}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(105, 108, 255, 0.08)',
                color: 'var(--color-primary, #696cff)',
              }}
            >
              {backIcon || <Icon component={ArrowLeftIcon} />}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {title && (
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text-heading, #435971)',
                }}
              >
                {title}
              </h2>
            )}
            {subTitle && (
              <span style={{ color: 'var(--color-text-secondary, #a1acb8)', fontSize: '0.875rem' }}>
                {subTitle}
              </span>
            )}
            {tags && tags.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {tags.map((tag, index) => (
                  <React.Fragment key={index}>{tag}</React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {extra && extra.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {extra.map((el, index) => (
              <React.Fragment key={index}>{el}</React.Fragment>
            ))}
          </div>
        )}
      </div>

      {children && (
        <div style={{ marginTop: '24px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

