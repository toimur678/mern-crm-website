import { Drawer, Button } from 'antd';
import { useCrudContext } from '@/context/crud';

export default function SidePanel({ config, topContent, bottomContent }) {
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed, isEditBoxOpen } = state;
  const { panel, collapsedBox } = crudContextAction;
  return (
    <Drawer
      className="record-drawer"
      title={isBoxCollapsed ? `${isEditBoxOpen ? 'Edit' : ''} ${config.ENTITY_NAME || config.PANEL_TITLE}`.trim() : config.ADD_NEW_ENTITY}
      placement="right"
      onClose={panel.close}
      open={!isPanelClose}
      width={480}
      extra={isBoxCollapsed && <Button size="small" onClick={collapsedBox.close}>Add new</Button>}
    >
      <div className="sidePanelContent">
        {isBoxCollapsed ? topContent : <><p className="form-introduction">Keep the details that help your team stay connected.</p>{bottomContent}</>}
      </div>
    </Drawer>
  );
}
