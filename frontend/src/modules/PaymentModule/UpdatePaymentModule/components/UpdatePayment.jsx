import { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectUpdatedItem } from '@/redux/erp/selectors';

import useLanguage from '@/locale/useLanguage';

import Loading from '@/components/Loading';
import calculate from '@/utils/calculate';

import PaymentForm from '@/forms/PaymentForm';
import { useNavigate } from 'react-router-dom';

export default function UpdatePayment({ config, currentInvoice }) {
  const translate = useLanguage();
  const navigate = useNavigate();
  let { entity } = config;
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const [form] = Form.useForm();

  const [maxAmount, setMaxAmount] = useState(0);

  useEffect(() => {
    if (currentInvoice) {
      const { credit = 0, total = 0, discount = 0 } = currentInvoice.invoice || {};
      setMaxAmount(Math.max(0, calculate.add(calculate.sub(calculate.sub(total, discount), credit), Number(currentInvoice.amount || 0))));
      const newInvoiceValues = { ...currentInvoice };
      if (newInvoiceValues.date) {
        newInvoiceValues.date = dayjs(newInvoiceValues.date);
      }
      form.setFieldsValue(newInvoiceValues);
    }
  }, [currentInvoice]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'update' }));
      dispatch(erp.list({ entity }));
      navigate(`/${entity.toLowerCase()}/read/${currentInvoice._id}`);
    }
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    fieldsValue = { ...fieldsValue, paymentMode: fieldsValue.paymentMode?._id || fieldsValue.paymentMode };

    dispatch(
      erp.update({
        entity,
        id: currentInvoice._id,
        jsonData: fieldsValue,
      })
    );
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <Form form={form} disabled={isLoading} layout="vertical" onFinish={onSubmit}>
          <PaymentForm maxAmount={maxAmount} />
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              {translate('Update')}
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </>
  );
}
