import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';
import { AppContextProvider } from '@/context/appContext';
import PageLoader from '@/components/PageLoader';
import AuthRouter from '@/router/AuthRouter';
import Localization from '@/locale/Localization';

const ErpApp = lazy(() => import('./ErpApp'));

export default function IdurarOs() {
  const { isLoggedIn } = useSelector(selectAuth);
  return <Localization>{isLoggedIn ? <AppContextProvider><Suspense fallback={<PageLoader />}><ErpApp /></Suspense></AppContextProvider> : <AuthRouter />}</Localization>;
}
