import { ErpLayout } from '@/layout';
import PageLoader from '@/components/PageLoader';
import NotFound from '@/components/NotFound';
import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Payment from './components/Payment';

export default function RecordPaymentModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { result, isLoading, isSuccess } = useSelector(selectReadItem);
  useLayoutEffect(() => { dispatch(erp.read({ entity: config.entity, id })); }, [id, config.entity, dispatch]);
  useLayoutEffect(() => { if (result?._id === id) dispatch(erp.currentAction({ actionType: 'recordPayment', data: result })); }, [result, id, dispatch]);
  return <ErpLayout>{isLoading || (isSuccess && result?._id !== id) ? <PageLoader /> : isSuccess && result ? <Payment config={config} currentItem={result} /> : <NotFound entity="invoice" />}</ErpLayout>;
}
