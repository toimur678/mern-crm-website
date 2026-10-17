import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Select, Skeleton } from 'antd';
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
  PlusOutlined,
  ReloadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import { request } from '@/request';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import './dashboard.css';

const numberFormatter = new Intl.NumberFormat();

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function getInitials(name = '') {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => Array.from(part)[0])
      .join('')
      .toUpperCase() || '?'
  );
}

function EmptyState({ icon, title, description, action }) {
  return (
    <div className="nexus-empty-state">
      <span className="nexus-empty-icon" aria-hidden="true">
        {icon}
      </span>
      <strong>{title}</strong>
      <p>{description}</p>
      {action}
    </div>
  );
}

function MetricCard({ label, value, detail, icon, tone = 'teal', loading }) {
  return (
    <article className="nexus-metric nexus-panel">
      <div className="nexus-metric-top">
        <span>{label}</span>
        <span className={`nexus-metric-icon is-${tone}`} aria-hidden="true">
          {icon}
        </span>
      </div>
      {loading ? (
        <Skeleton active={false} title={{ width: '65%' }} paragraph={{ rows: 1, width: '85%' }} />
      ) : (
        <>
          <div className="nexus-metric-value">{value}</div>
          <p>{detail}</p>
        </>
      )}
    </article>
  );
}

function CashFlow({ monthly, currency, period, setPeriod, formatMoney }) {
  const collected = monthly.reduce((total, item) => total + item.collected, 0);
  const invoiced = monthly.reduce((total, item) => total + item.invoiced, 0);
  const options = useMemo(
    () => ({
      chart: {
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: false },
        fontFamily: 'inherit',
        foreColor: '#62756e',
        parentHeightOffset: 0,
      },
      colors: ['#087f70', '#afc6bf'],
      stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 5] },
      dataLabels: { enabled: false },
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 0, opacityFrom: 0.2, opacityTo: 0, stops: [0, 90, 100] },
      },
      grid: {
        borderColor: '#edf1ef',
        strokeDashArray: 4,
        padding: { left: 10, right: 10, top: 0, bottom: 0 },
      },
      xaxis: {
        categories: monthly.map((item) =>
          new Date(`${item.month}-01T00:00:00Z`).toLocaleDateString(undefined, {
            month: 'short',
            ...(period === 12 ? { year: '2-digit' } : {}),
            timeZone: 'UTC',
          })
        ),
        axisTicks: { show: false },
        axisBorder: { show: false },
        tooltip: { enabled: false },
        labels: { style: { fontSize: '11px' }, hideOverlappingLabels: true },
      },
      yaxis: {
        min: 0,
        tickAmount: 4,
        labels: {
          formatter: (value) =>
            new Intl.NumberFormat(undefined, {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(value),
          style: { fontSize: '11px' },
        },
      },
      tooltip: { theme: 'light', y: { formatter: (value) => formatMoney(value) } },
      legend: { show: false },
      markers: { size: 0, hover: { size: 5 } },
    }),
    [monthly, period, formatMoney]
  );

  return (
    <section className="nexus-panel nexus-cash-flow" aria-labelledby="cash-flow-heading">
      <div className="nexus-panel-heading">
        <div>
          <h2 id="cash-flow-heading">Cash flow</h2>
          <p>A closer look at money in and invoices out.</p>
        </div>
        <Select
          aria-label="Cash flow period"
          value={period}
          onChange={setPeriod}
          options={[
            { value: 6, label: 'Last 6 months' },
            { value: 12, label: 'Last 12 months' },
          ]}
          popupMatchSelectWidth={false}
        />
      </div>
      <div className="nexus-chart-totals">
        <div>
          <span>
            <i className="nexus-dot is-teal" />
            Collected
          </span>
          <strong>{formatMoney(collected)}</strong>
        </div>
        <div>
          <span>
            <i className="nexus-dot is-sage" />
            Invoiced
          </span>
          <strong>{formatMoney(invoiced)}</strong>
        </div>
        <span className="nexus-currency-label">{currency}</span>
      </div>
      {collected || invoiced ? (
        <>
          <div
            className="nexus-chart"
            role="img"
            aria-label={`Monthly collected payments and issued invoices in ${currency} over the last ${period} months. Exact values follow in the accessible data table.`}
          >
            <Chart
              options={options}
              series={[
                { name: 'Collected', data: monthly.map((item) => item.collected) },
                { name: 'Invoiced', data: monthly.map((item) => item.invoiced) },
              ]}
              type="area"
              height={260}
            />
          </div>
          <table className="nexus-sr-only">
            <caption>Monthly cash flow in {currency}</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Collected</th>
                <th scope="col">Invoiced</th>
              </tr>
            </thead>
            <tbody>
              {monthly.map((item) => (
                <tr key={item.month}>
                  <th scope="row">{item.month}</th>
                  <td>{formatMoney(item.collected)}</td>
                  <td>{formatMoney(item.invoiced)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <EmptyState
          icon={<DollarOutlined />}
          title="Your cash flow starts here"
          description="Issued invoices and recorded payments will appear in this chart."
          action={
            <Link to="/invoice/create">
              Create your first invoice <ArrowRightOutlined />
            </Link>
          }
        />
      )}
    </section>
  );
}

function InvoiceHealth({ metrics }) {
  const percentage = metrics.invoiceCount
    ? Math.round((metrics.paidCount / metrics.invoiceCount) * 100)
    : 0;
  const paidEnd = metrics.invoiceCount ? (metrics.paidCount / metrics.invoiceCount) * 100 : 0;
  const partialEnd = metrics.invoiceCount
    ? ((metrics.paidCount + metrics.partialCount) / metrics.invoiceCount) * 100
    : 0;
  return (
    <section className="nexus-panel nexus-invoice-health" aria-labelledby="invoice-health-heading">
      <div className="nexus-panel-heading">
        <div>
          <h2 id="invoice-health-heading">Invoice health</h2>
          <p>Every invoice, accounted for.</p>
        </div>
        <span className="nexus-subtle-icon" aria-hidden="true">
          <FileTextOutlined />
        </span>
      </div>
      <div
        className="nexus-health-donut"
        role="img"
        aria-label={`${percentage}% of ${metrics.invoiceCount} issued invoices are fully paid`}
        style={{
          background: `conic-gradient(#087f70 0% ${paidEnd}%, #e8ba6b ${paidEnd}% ${partialEnd}%, #e9eeeb ${partialEnd}% 100%)`,
        }}
      >
        <div>
          <strong>
            {percentage}
            <span>%</span>
          </strong>
          <span>fully paid</span>
        </div>
      </div>
      <dl className="nexus-health-legend">
        <div>
          <dt>
            <i className="nexus-dot is-teal" />
            Paid
          </dt>
          <dd>{numberFormatter.format(metrics.paidCount)}</dd>
        </div>
        <div>
          <dt>
            <i className="nexus-dot is-amber" />
            Partially paid
          </dt>
          <dd>{numberFormatter.format(metrics.partialCount)}</dd>
        </div>
        <div>
          <dt>
            <i className="nexus-dot is-light" />
            Unpaid
          </dt>
          <dd>{numberFormatter.format(metrics.unpaidCount)}</dd>
        </div>
      </dl>
      <Link className="nexus-panel-footer-link" to="/invoice">
        View all invoices <ArrowRightOutlined />
      </Link>
    </section>
  );
}

function RecentInvoices({ invoices, formatMoney }) {
  return (
    <section
      className="nexus-panel nexus-recent-invoices"
      aria-labelledby="recent-invoices-heading"
    >
      <div className="nexus-panel-heading">
        <div>
          <h2 id="recent-invoices-heading">Recent invoices</h2>
          <p>Your latest issued invoices, at a glance.</p>
        </div>
        <Link className="nexus-view-link" to="/invoice">
          View all <ArrowRightOutlined />
        </Link>
      </div>
      {invoices.length ? (
        <div className="nexus-table-wrap">
          <table className="nexus-invoice-table">
            <thead>
              <tr>
                <th scope="col">Invoice / Client</th>
                <th scope="col">Due date</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="nexus-sr-only">Open invoice</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                const status =
                  invoice.balance <= 0
                    ? 'Paid'
                    : invoice.overdue
                      ? 'Overdue'
                      : invoice.balance < invoice.total
                        ? 'Partial'
                        : 'Unpaid';
                return (
                  <tr key={invoice._id}>
                    <td>
                      <div className="nexus-client-cell">
                        <span className="nexus-client-avatar" aria-hidden="true">
                          {getInitials(invoice.client)}
                        </span>
                        <div>
                          <Link to={`/invoice/read/${invoice._id}`}>
                            {invoice.client || 'Client unavailable'}
                          </Link>
                          <span>INV-{String(invoice.number).padStart(4, '0')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="nexus-date-cell">{formatDate(invoice.expiredDate)}</td>
                    <td className="nexus-amount-cell">{formatMoney(invoice.total)}</td>
                    <td>
                      <span className={`nexus-status is-${status.toLowerCase()}`}>
                        <i />
                        {status}
                      </span>
                    </td>
                    <td>
                      <Link
                        className="nexus-row-link"
                        to={`/invoice/read/${invoice._id}`}
                        aria-label={`Open invoice ${invoice.number}`}
                      >
                        <ArrowRightOutlined />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={<FileTextOutlined />}
          title="A fresh start for your invoices"
          description="Once an invoice is issued, you can keep track of it here."
          action={
            <Link to="/invoice/create">
              Create an invoice <ArrowRightOutlined />
            </Link>
          }
        />
      )}
    </section>
  );
}

function RecentPayments({ payments, formatMoney }) {
  return (
    <section
      className="nexus-panel nexus-recent-payments"
      aria-labelledby="recent-payments-heading"
    >
      <div className="nexus-panel-heading">
        <div>
          <h2 id="recent-payments-heading">Recent payments</h2>
          <p>The latest money coming in.</p>
        </div>
        <Link className="nexus-icon-link" to="/payment" aria-label="View all payments">
          <ArrowRightOutlined />
        </Link>
      </div>
      {payments.length ? (
        <ul className="nexus-payment-list">
          {payments.map((payment) => (
            <li key={payment._id}>
              <span className="nexus-payment-icon" aria-hidden="true">
                <ArrowDownOutlined />
              </span>
              <div className="nexus-payment-info">
                <Link to={`/payment/read/${payment._id}`}>
                  {payment.client || 'Client unavailable'}
                </Link>
                <span>
                  {formatDate(payment.date)}
                  {payment.invoiceNumber !== undefined && (
                    <> · INV-{String(payment.invoiceNumber).padStart(4, '0')}</>
                  )}
                </span>
              </div>
              <strong>{formatMoney(payment.amount)}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<CheckOutlined />}
          title="Ready for your first payment"
          description="Payments recorded against your invoices will appear here."
          action={
            <Link to="/invoice">
              Go to invoices <ArrowRightOutlined />
            </Link>
          }
        />
      )}
      {payments.length > 0 && (
        <div className="nexus-payment-note">
          <span className="nexus-dot is-teal" />
          Recorded payments in your selected currency
        </div>
      )}
    </section>
  );
}

export default function DashboardModule() {
  const settings = useSelector(selectMoneyFormat);
  const admin = useSelector(selectCurrentAdmin);
  const [selectedCurrency, setCurrency] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [period, setPeriod] = useState(6);
  const [reload, setReload] = useState(0);
  const [state, setState] = useState({ loading: true, error: '', data: null });
  const settingCurrency = settings?.default_currency_code;
  const currency =
    selectedCurrency || (/^[A-Z]{3}$/.test(settingCurrency) ? settingCurrency : 'USD');
  const money = useMemo(
    () =>
      new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 2 }),
    [currency]
  );
  const formatMoney = useMemo(() => (value) => money.format(value || 0), [money]);

  useEffect(() => {
    let active = true;
    setState((previous) => ({ ...previous, loading: true, error: '' }));
    const params = new URLSearchParams({ currency, period: String(period) });
    request
      .get({ entity: `dashboard/summary?${params.toString()}` })
      .then((response) => {
        if (!active) return;
        if (response?.success && response.result) {
          setCurrencies(response.result.availableCurrencies || []);
          setState({ loading: false, error: '', data: response.result });
        } else {
          setState({
            loading: false,
            error:
              response?.message || 'We couldn’t load your business overview. Please try again.',
            data: null,
          });
        }
      })
      .catch(() => {
        if (active)
          setState({
            loading: false,
            error: 'We couldn’t load your business overview. Please try again.',
            data: null,
          });
      });
    return () => {
      active = false;
    };
  }, [currency, period, reload]);

  const metrics = state.data?.metrics;
  const firstName = admin?.name?.split(' ')[0];
  const date = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const metricCards = [
    {
      label: 'Total collected',
      value: formatMoney(metrics?.collected),
      detail: `${numberFormatter.format(metrics?.paymentCount || 0)} payments recorded`,
      icon: <DollarOutlined />,
    },
    {
      label: 'Outstanding',
      value: formatMoney(metrics?.outstanding),
      detail: `${numberFormatter.format(metrics?.outstandingCount || 0)} invoices awaiting payment`,
      icon: <ClockCircleOutlined />,
      tone: 'sage',
    },
    {
      label: 'Overdue',
      value: formatMoney(metrics?.overdue),
      detail: `${numberFormatter.format(metrics?.overdueCount || 0)} invoices past their due date`,
      icon: <CalendarOutlined />,
      tone: 'amber',
    },
    {
      label: 'Active clients',
      value: numberFormatter.format(metrics?.activeClients || 0),
      detail: 'Across your entire workspace',
      icon: <TeamOutlined />,
      tone: 'blue',
    },
  ];

  return (
    <div className="nexus-dashboard">
      <div className="nexus-dashboard-header">
        <div>
          <span className="nexus-eyebrow">
            {firstName ? `WELCOME BACK, ${firstName}` : 'YOUR WORKSPACE, AT A GLANCE'}
          </span>
          <h1>Business overview</h1>
          <p>Keep a clear view of your business. Make your next move count.</p>
        </div>
        <Link className="nexus-new-invoice" to="/invoice/create">
          <PlusOutlined /> New invoice
        </Link>
      </div>
      <div className="nexus-dashboard-toolbar">
        <span className="nexus-today">
          <CalendarOutlined />
          {date}
        </span>
        <div className="nexus-dashboard-filters">
          <span className="nexus-filter-label">All-time totals</span>
          <Select
            aria-label="Dashboard currency"
            value={currency}
            onChange={setCurrency}
            options={[...new Set([currency, ...currencies])].map((value) => ({
              value,
              label: value,
            }))}
            popupMatchSelectWidth={false}
          />
          <Button
            aria-label="Refresh dashboard"
            icon={<ReloadOutlined />}
            onClick={() => setReload((value) => value + 1)}
            disabled={state.loading}
          />
        </div>
      </div>

      {state.error ? (
        <div className="nexus-panel nexus-dashboard-error" role="alert">
          <span className="nexus-empty-icon">
            <ReloadOutlined />
          </span>
          <h2>Your overview is taking a moment</h2>
          <p>{state.error}</p>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => setReload((value) => value + 1)}
          >
            Try again
          </Button>
        </div>
      ) : (
        <div aria-busy={state.loading}>
          <span className="nexus-sr-only" role="status">
            {state.loading ? 'Loading business overview' : 'Business overview loaded'}
          </span>
          <div className="nexus-metric-grid">
            {metricCards.map((card) => (
              <MetricCard key={card.label} {...card} loading={state.loading} />
            ))}
          </div>
          {state.loading ? (
            <div className="nexus-dashboard-content">
              <div className="nexus-panel nexus-content-skeleton">
                <Skeleton active={false} paragraph={{ rows: 8 }} />
              </div>
              <div className="nexus-panel nexus-content-skeleton">
                <Skeleton active={false} paragraph={{ rows: 8 }} />
              </div>
            </div>
          ) : (
            state.data && (
              <>
                <div className="nexus-dashboard-content">
                  <CashFlow
                    monthly={state.data.monthly}
                    currency={currency}
                    period={period}
                    setPeriod={setPeriod}
                    formatMoney={formatMoney}
                  />
                  <InvoiceHealth metrics={metrics} />
                </div>
                <div className="nexus-dashboard-content">
                  <RecentInvoices invoices={state.data.recentInvoices} formatMoney={formatMoney} />
                  <RecentPayments payments={state.data.recentPayments} formatMoney={formatMoney} />
                </div>
                <div className="nexus-dashboard-footnote">
                  <span>
                    Invoice totals exclude drafts, cancelled and refunded invoices. Chart dates use
                    UTC.
                  </span>
                  <span>
                    <i className="nexus-dot is-teal" />
                    Updated{' '}
                    {new Date(state.data.updatedAt).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}
