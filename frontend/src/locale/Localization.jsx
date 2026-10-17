import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';

export default function Localization({ children }) {
  return <ConfigProvider locale={enUS} theme={{ token: {
    colorPrimary: '#087f70', colorLink: '#087f70', colorSuccess: '#258455', colorWarning: '#b57a24', colorError: '#ca5353', colorInfo: '#3977a8',
    borderRadius: 8, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 13,
    colorBgContainer: '#ffffff', colorBgLayout: '#f6f8f7', colorText: '#354b47', colorTextHeading: '#182c2a', colorTextSecondary: '#62756e', colorBorder: '#dce5e0', colorBorderSecondary: '#e9eeeb',
    controlHeight: 40, boxShadow: '0 2px 8px rgba(24, 44, 42, 0.04)', boxShadowSecondary: '0 8px 32px rgba(24, 44, 42, 0.1)',
  }, components: {
    Button: { fontWeight: 500, primaryShadow: '0 1px 2px rgba(24, 44, 42, 0.08)' },
    Card: { borderRadiusLG: 12 }, Table: { headerBg: '#f8faf9', headerColor: '#62756e', cellPaddingBlock: 17, cellPaddingInline: 20 },
    Tag: { borderRadiusSM: 5 }, Dropdown: { borderRadiusLG: 10 }, Modal: { borderRadiusLG: 14 },
    Tabs: { horizontalItemGutter: 28, titleFontSize: 13 }, Descriptions: { labelBg: '#f8faf9' },
    Pagination: { itemActiveBg: '#eaf5f0' },
  } }}>{children}</ConfigProvider>;
}
