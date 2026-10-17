import { Suspense, useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '@/apps/Navigation/NavigationContainer';
import HeaderContent from '@/apps/Header/HeaderContainer';
import PageLoader from '@/components/PageLoader';
import ContentLoader from '@/components/ContentLoader';
import { settingsAction } from '@/redux/settings/actions';
import { selectSettings } from '@/redux/settings/selectors';
import AppRouter from '@/router/AppRouter';

export default function ErpCrmApp() {
  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector(selectSettings);
  const [requested, setRequested] = useState(false);
  const [hasLoadedSettings, setHasLoadedSettings] = useState(false);

  useEffect(() => {
    if (isSuccess) setHasLoadedSettings(true);
  }, [isSuccess]);

  useEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
    setRequested(true);
  }, [dispatch]);

  if (!isSuccess && !hasLoadedSettings) {
    if (!requested || isLoading) return <PageLoader />;
    return <div className="workspace-error"><Result status="warning" title="Your workspace couldn’t load" subTitle="Check your connection and try again." extra={<Button type="primary" onClick={() => dispatch(settingsAction.list({ entity: 'setting' }))}>Try again</Button>} /></div>;
  }

  return (
    <div className="workspace-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <div className="workspace-main">
        <HeaderContent />
        <main id="main-content" className="workspace-content" tabIndex={-1}>
          <Suspense fallback={<ContentLoader />}><AppRouter /></Suspense>
        </main>
        <footer className="workspace-footer"><span>Nexus CRM</span><span>A little more clarity. A lot more possibility.</span></footer>
      </div>
    </div>
  );
}
