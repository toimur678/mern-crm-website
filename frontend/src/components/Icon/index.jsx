import React from 'react';

/**
 * Wraps Heroicons to behave like Ant Design icons.
 * Automatically inherits font-size (1em) so it scales with text, 
 * just like @ant-design/icons did.
 */
export default function Icon({ component: Component, className = '', style = {}, ...props }) {
  if (!Component) return null;
  return (
    <span
      className={`anticon ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: '-0.125em',
        ...style,
      }}
    >
      <Component
        style={{
          width: '1em',
          height: '1em',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
        {...props}
      />
    </span>
  );
}

