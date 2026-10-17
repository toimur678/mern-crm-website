import { Spin } from 'antd';
export default function PageLoader() {
  return <div className="page-loading" role="status"><Spin size="large" /><span>Opening your workspace…</span></div>;
}
