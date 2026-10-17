import { useState, useEffect } from 'react';
import { Form, Button, Tag } from 'antd';
import dayjs from 'dayjs';
import PageHeader from '@/components/PageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectUpdatedItem } from '@/redux/erp/selectors';
import Loading from '@/components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { settingsAction } from '@/redux/settings/actions';

export default function UpdateItem({ config, UpdateForm }) {
  const { entity } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => { dispatch(settingsAction.list({ entity: 'setting' })); }, []);
  useEffect(() => {
    if (current) { form.setFieldsValue({ ...current, date: dayjs(current.date), expiredDate: dayjs(current.expiredDate), taxRate: current.taxRate || 0 }); setSubTotal(current.subTotal || 0); }
  }, [current]);
  useEffect(() => {
    if (isSuccess) { dispatch(erp.resetAction({ actionType: 'update' })); navigate(`/${entity}/read/${id}`); }
  }, [isSuccess]);
  const onSubmit = (values) => {
    const jsonData = { ...values, client: values.client?._id || values.client, date: values.date?.toISOString(), expiredDate: values.expiredDate?.toISOString(), items: values.items.map(({ itemName, description, quantity, price }) => ({ itemName, description, quantity, price, total: quantity * price })) };
    dispatch(erp.update({ entity, id, jsonData }));
  };
  return <>
    <PageHeader onBack={() => navigate(`/${entity}/read/${id}`)} title={`Edit ${entity}${current?.number ? ` #${current.number}` : ''}`} description="Keep the details up to date and the next steps clear." tags={current?.status && <Tag bordered={false}>{current.status}</Tag>} extra={[<Button key="cancel" onClick={() => navigate(`/${entity}/read/${id}`)}>Cancel</Button>, <Button key="save" type="primary" loading={isLoading} onClick={() => form.submit()}>Save changes</Button>]} />
    <div className="record-form-card"><Loading isLoading={isLoading}><Form form={form} disabled={isLoading} layout="vertical" onFinish={onSubmit} onValuesChange={(_, values) => setSubTotal((values.items || []).reduce((sum, item) => sum + Number(item?.quantity || 0) * Number(item?.price || 0), 0))}><UpdateForm subTotal={subTotal} current={current} /></Form></Loading></div>
  </>;
}
