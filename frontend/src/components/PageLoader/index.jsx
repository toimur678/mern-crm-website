import React from 'react';
import { Spin } from 'antd';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';



const PageLoader = () => {
  const antIcon = <Icon component={ArrowPathIcon} style={{ fontSize: 64 }} spin />;
  return (
    <div className="centerAbsolute">
      <Spin indicator={antIcon}></Spin>
    </div>
  );
};
export default PageLoader;
