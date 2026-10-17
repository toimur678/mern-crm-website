import { Spin } from 'antd';
export default function ContentLoader() {
  return <div className="content-loading" role="status"><Spin /><span>Loading…</span></div>;
}
