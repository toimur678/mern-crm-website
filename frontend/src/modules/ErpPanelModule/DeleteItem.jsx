import { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { selectDeletedItem } from '@/redux/erp/selectors';
import { valueByString } from '@/utils/helpers';

export default function Delete({ config }) {
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { state: { deleteModal }, erpContextAction: { modal } } = useErpContext();
  const selectedRef = useRef(null);
  if (current?._id) selectedRef.current = current;
  const selected = current?._id ? current : selectedRef.current;
  const displayItem = (config.deleteModalLabels || ['number']).map((key) => valueByString(selected, key)).filter(Boolean).join(' · ');
  useEffect(() => {
    if (isSuccess) { modal.close(); dispatch(erp.resetAction({ actionType: 'delete' })); }
  }, [isSuccess]);
  return <Modal title={`Delete ${config.entity}?`} open={deleteModal.isOpen} onOk={() => selected?._id && dispatch(erp.delete({ entity: config.entity, id: selected._id }))} onCancel={() => !isLoading && modal.close()} confirmLoading={isLoading} okText={`Delete ${config.entity}`} cancelText="Keep record" okButtonProps={{ danger: true }}><p>Are you sure you want to delete <strong>{displayItem || `this ${config.entity}`}</strong>?</p><p style={{ color: '#70817e' }}>This record will be removed from your workspace.</p></Modal>;
}
