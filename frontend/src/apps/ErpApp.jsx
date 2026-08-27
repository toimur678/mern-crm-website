import { useLayoutEffect, Suspense } from 'react';
import { useEffect } from 'react';
import { selectAppSettings } from '@/redux/settings/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'antd';

import { useAppContext } from '@/context/appContext';

import Navigation from '@/apps/Navigation/NavigationContainer';

import HeaderContent from '@/apps/Header/HeaderContainer';
import PageLoader from '@/components/PageLoader';
import ContentLoader from '@/components/ContentLoader';
import PageTransition from '@/components/PageTransition';

import { settingsAction } from '@/redux/settings/actions';

import { selectSettings } from '@/redux/settings/selectors';

import AppRouter from '@/router/AppRouter';

import useResponsive from '@/hooks/useResponsive';

import storePersist from '@/redux/storePersist';

export default function ErpCrmApp() {
  const { Content } = Layout;

  const { isMobile } = useResponsive();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
  }, []);

  const { isSuccess: settingIsloaded } = useSelector(selectSettings);

  if (settingIsloaded)
    return (
      <Layout
        hasSider
        style={{
          background: 'transparent',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
          gap: '0px',
          paddingRight: '24px',
        }}
      >
        <Navigation />

        <Layout
          style={{
            background: 'transparent',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
            paddingLeft: '24px',
          }}
        >
          <HeaderContent />
          <Content
            className="content-stable"
            style={{
              overflow: 'auto',
              width: '100%',
              maxWidth: 'none',
              paddingBottom: '24px',
            }}
          >
            <Suspense fallback={<ContentLoader />}>
              <PageTransition>
                <AppRouter />
              </PageTransition>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  else return <PageLoader />;
}

