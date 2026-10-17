import { ErpLayout } from '@/layout';
import ReadItem from './components/ReadItem';
import PageLoader from '@/components/PageLoader';
import NotFound from '@/components/NotFound';
import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ReadPaymentModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { result, isLoading, isSuccess } = useSelector(selectReadItem);
  useLayoutEffect(() => { dispatch(erp.read({ entity: config.entity, id })); }, [id, config.entity, dispatch]);
  return <ErpLayout>{isLoading || (isSuccess && result?._id !== id) ? <PageLoader /> : isSuccess && result ? <ReadItem config={config} selectedItem={result} /> : <NotFound entity="payment" />}</ErpLayout>;
}
