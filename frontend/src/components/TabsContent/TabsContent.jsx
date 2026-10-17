import { useEffect, useState } from 'react';
import { Tabs } from 'antd';

export default function TabsContent({ content, defaultActiveKey, pageTitle }) {
  const items = content.map((item, index) => ({
    ...item,
    key: item.key || String(index),
    label: (
      <span className="settings-tab-label">
        {item.icon}
        {item.label}
      </span>
    ),
    icon: undefined,
    children: <div className="settings-panel">{item.children}</div>,
  }));
  const validDefault = items.some((item) => item.key === defaultActiveKey)
    ? defaultActiveKey
    : items[0]?.key;
  const [activeKey, setActiveKey] = useState(validDefault);
  useEffect(() => {
    setActiveKey(validDefault);
  }, [validDefault]);
  return (
    <div className="settings-shell">
      <header className="settings-page-header">
        <span className="settings-eyebrow">YOUR WORKSPACE</span>
        <h1>{pageTitle || 'Settings'}</h1>
        <p>Make Nexus work the way your business does.</p>
      </header>
      <Tabs
        className="settings-tabs"
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
        destroyInactiveTabPane
      />
    </div>
  );
}
