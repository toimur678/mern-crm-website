import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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
          <LoadingOutlined
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
