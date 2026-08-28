import { useEffect } from 'react';

import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';

import './dashboard.css';

import WelcomeBanner from './components/WelcomeBanner';
import SummaryCard from './components/SummaryCard';
import TotalRevenueCard from './components/TotalRevenueCard';
import ProfileReport from './components/ProfileReport';
import OrderStatistics from './components/OrderStatistics';
import IncomeAreaChart from './components/IncomeAreaChart';
import TransactionsList from './components/TransactionsList';
import RecentTable from './components/RecentTable';

export default function DashboardModule() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const getStatsData = async ({ entity, currency }) => {
    return await request.summary({
      entity,
      options: { currency },
    });
  };

  const {
    result: invoiceResult,
    isLoading: invoiceLoading,
    onFetch: fetchInvoicesStats,
  } = useOnFetch();

  const { result: quoteResult, isLoading: quoteLoading, onFetch: fetchQuotesStats } = useOnFetch();

  const {
    result: paymentResult,
    isLoading: paymentLoading,
    onFetch: fetchPayemntsStats,
  } = useOnFetch();

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  useEffect(() => {
    const currency = money_format_settings.default_currency_code || null;

    if (currency) {
      fetchInvoicesStats(getStatsData({ entity: 'invoice', currency }));
      fetchQuotesStats(getStatsData({ entity: 'quote', currency }));
      fetchPayemntsStats(getStatsData({ entity: 'payment', currency }));
    }
  }, [money_format_settings.default_currency_code]);

  const dataTableColumns = [
    {
      title: translate('number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      onCell: () => ({
        style: {
          textAlign: 'right',
          whiteSpace: 'nowrap',
          direction: 'ltr',
        },
      }),
      render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  if (!money_format_settings) {
    return <></>;
  }

  return (
    <div className="animate-fade-in-up">
      <div className="dashboard-grid-container">
        
        {/* ─── Row 1 ─── */}
        <div className="grid-area-welcome">
          <WelcomeBanner />
        </div>
        <div className="grid-area-stat1">
          <SummaryCard
            title={translate('Profit')}
            isLoading={invoiceLoading}
            data={invoiceResult?.total}
            growth="+72.80%"
            growthDirection="up"
          />
        </div>
        <div className="grid-area-stat2">
          <SummaryCard
            title={translate('Sales')}
            isLoading={quoteLoading}
            data={quoteResult?.total}
            growth="+28.42%"
            growthDirection="up"
          />
        </div>

        {/* ─── Row 2 ─── */}
        <div className="grid-area-revenue">
          <TotalRevenueCard />
        </div>
        <div className="grid-area-stat3">
          <SummaryCard
            title={translate('Payments')}
            isLoading={paymentLoading}
            data={paymentResult?.total}
            growth="-14.82%"
            growthDirection="down"
          />
        </div>
        <div className="grid-area-stat4">
          <SummaryCard
            title={translate('Transactions')}
            isLoading={invoiceLoading}
            data={invoiceResult?.total_undue}
            growth="+28.14%"
            growthDirection="up"
          />
        </div>

        {/* ─── Row 3 ─── */}
        <div className="grid-area-order">
          <OrderStatistics />
        </div>
        <div className="grid-area-income">
          <IncomeAreaChart />
        </div>
        <div className="grid-area-profile">
          <ProfileReport />
        </div>

        {/* ─── Row 4 ─── */}
        <div className="grid-area-transactions">
          <TransactionsList />
        </div>

        {/* ─── Row 5: Recent Tables ─── */}
        <div style={{ gridColumn: 'span 6' }}>
          <div className="crm-dashboard-card" style={{ height: '100%' }}>
            <h3
              style={{
                color: 'var(--text-primary)',
                marginBottom: '8px',
                padding: '0 0 16px',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-bold)',
                marginTop: 0,
              }}
            >
              {translate('Recent Invoices')}
            </h3>
            <RecentTable entity={'invoice'} dataTableColumns={dataTableColumns} />
          </div>
        </div>

        <div style={{ gridColumn: 'span 6' }}>
          <div className="crm-dashboard-card" style={{ height: '100%' }}>
            <h3
              style={{
                color: 'var(--text-primary)',
                marginBottom: '8px',
                padding: '0 0 16px',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-bold)',
                marginTop: 0,
              }}
            >
              {translate('Recent Quotes')}
            </h3>
            <RecentTable entity={'quote'} dataTableColumns={dataTableColumns} />
          </div>
        </div>
      </div>
    </div>
  );
}
