import { Spin } from 'antd';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';


const ContentLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 120px)',
        width: '100%',
      }}
    >
      <Spin
        indicator={
          <Icon component={ArrowPathIcon}
            style={{
              fontSize: 36,
              color: 'var(--color-primary)',
            }}
            spin
          />
        }
      />
    </div>
  );
};

export default ContentLoader;
