import { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectDeletedItem } from '@/redux/crud/selectors';
import { valueByString } from '@/utils/helpers';

export default function DeleteModal({ config }) {
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { state: { isModalOpen }, crudContextAction: { panel, readBox, modal } } = useCrudContext();
  const selectedRef = useRef(null);
  if (current?._id) selectedRef.current = current;
  const selected = current?._id ? current : selectedRef.current;
  const displayItem = (config.deleteModalLabels || ['name']).map((key) => valueByString(selected, key)).filter(Boolean).join(' · ');
  useEffect(() => {
    if (isSuccess) { modal.close(); readBox.close(); panel.close(); dispatch(crud.resetAction({ actionType: 'delete' })); }
  }, [isSuccess]);
  return <Modal title={config.modalTitle || 'Delete this record?'} open={isModalOpen} onOk={() => selected?._id && dispatch(crud.delete({ entity: config.entity, id: selected._id }))} onCancel={() => !isLoading && modal.close()} confirmLoading={isLoading} okText="Delete record" cancelText="Keep record" okButtonProps={{ danger: true }}><p>Are you sure you want to delete <strong>{displayItem || 'this record'}</strong>?</p><p style={{ color: '#70817e' }}>This record will be removed from your workspace.</p></Modal>;
}
