import { ConfigProvider } from 'antd';

export default function Localization({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#696cff',
          colorLink: '#696cff',
          colorSuccess: '#71dd37',
          colorWarning: '#ffab00',
          colorError: '#ff3e1d',
          colorInfo: '#03c3ec',
          borderRadius: 10,
          fontFamily: "'Public Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f5f5f9',
          colorText: '#566a7f',
          colorTextHeading: '#435971',
          colorTextSecondary: '#a1acb8',
          colorBorder: '#e7e7e8',
          colorBorderSecondary: '#eeeef0',
          boxShadow: '0 2px 6px 0 rgba(67, 89, 113, 0.12)',
        },
        components: {
          Button: {
            borderRadius: 8,
            controlHeight: 38,
          },
          Input: {
            borderRadius: 8,
          },
          Select: {
            borderRadius: 8,
          },
          Card: {
            borderRadiusLG: 10,
          },
          Table: {
            borderRadius: 10,
            headerBg: '#f5f5f9',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

