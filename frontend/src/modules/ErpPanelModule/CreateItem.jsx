import { useState, useEffect } from 'react';
import { Button, Tag, Form } from 'antd';
import PageHeader from '@/components/PageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { settingsAction } from '@/redux/settings/actions';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';
import Loading from '@/components/Loading';
import { useNavigate } from 'react-router-dom';

export default function CreateItem({ config, CreateForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entity } = config;
  const { isLoading, isSuccess, result } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => { dispatch(settingsAction.list({ entity: 'setting' })); }, []);
  useEffect(() => {
    if (isSuccess) { form.resetFields(); dispatch(erp.resetAction({ actionType: 'create' })); navigate(`/${entity}/read/${result._id}`); }
  }, [isSuccess]);
  const onSubmit = (values) => {
    const jsonData = { ...values, client: values.client?._id || values.client, items: values.items.map((item) => ({ ...item, total: Number(item.quantity || 0) * Number(item.price || 0) })) };
    dispatch(erp.create({ entity, jsonData }));
  };
  return <>
    <PageHeader onBack={() => navigate(`/${entity}`)} title={`Create ${entity}`} description="A little detail now. A smoother payment later." tags={<Tag bordered={false}>Draft</Tag>} extra={[<Button key="cancel" onClick={() => navigate(`/${entity}`)}>Cancel</Button>, <Button key="save" type="primary" loading={isLoading} onClick={() => form.submit()}>Create {entity}</Button>]} />
    <div className="record-form-card"><Loading isLoading={isLoading}><Form form={form} disabled={isLoading} layout="vertical" onFinish={onSubmit} onValuesChange={(_, values) => setSubTotal((values.items || []).reduce((sum, item) => sum + Number(item?.quantity || 0) * Number(item?.price || 0), 0))}><CreateForm subTotal={subTotal} /></Form></Loading></div>
  </>;
}
