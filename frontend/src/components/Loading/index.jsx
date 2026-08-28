import { Spin } from 'antd';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';


export default function Loading({ isLoading, children }) {
  const antIcon = <Icon component={ArrowPathIcon} style={{ fontSize: 24 }} spin />;

  return (
    <Spin indicator={antIcon} spinning={isLoading}>
      {children}
    </Spin>
  );
}
