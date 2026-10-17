import React from 'react';
import { Button } from 'antd';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

export default function PageHeader({ title, subTitle, description, onBack, backIcon, tags, extra, style, children }) {
  return (
    <header className="record-page-header" style={style}>
      <div className="record-page-header-main">
        <div className="record-page-heading">
          {onBack && <Button className="record-back-button" aria-label="Go back" onClick={onBack} icon={backIcon || <Icon component={ArrowLeftIcon} />} />}
          <div className="record-page-heading-copy">
            <div className="record-page-title-row">
              {title && <h1>{title}</h1>}
              {tags && <div className="record-page-tags">{tags}</div>}
            </div>
            {(description || subTitle) && <p>{description || subTitle}</p>}
          </div>
        </div>
        {extra && <div className="record-page-actions">{React.Children.toArray(extra).filter(Boolean)}</div>}
      </div>
      {children && <div className="record-page-header-content">{children}</div>}
    </header>
  );
}
