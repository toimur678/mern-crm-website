import { ErpContextProvider } from '@/context/erp';

export default function ErpLayout({ children }) {
  return <ErpContextProvider><div className="record-workspace">{children}</div></ErpContextProvider>;
}
