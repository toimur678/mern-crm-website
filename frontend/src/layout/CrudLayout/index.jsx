import DefaultLayout from '../DefaultLayout';
import SidePanel from '@/components/SidePanel';

export default function CrudLayout({ children, config, sidePanelTopContent, sidePanelBottomContent, fixHeaderPanel }) {
  return (
    <DefaultLayout>
      <SidePanel config={config} topContent={sidePanelTopContent} bottomContent={sidePanelBottomContent} fixHeaderPanel={fixHeaderPanel} />
      <div className="record-workspace">{children}</div>
    </DefaultLayout>
  );
}
