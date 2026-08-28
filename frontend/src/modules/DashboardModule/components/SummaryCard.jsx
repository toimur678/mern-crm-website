import { Spin, Tooltip } from 'antd';
import { useMoney } from '@/settings';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';
import {
  ChartPieIcon,
  WalletIcon,
  CreditCardIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  Profit: ChartPieIcon,
  Sales: WalletIcon,
  Payments: CreditCardIcon,
  Transactions: BanknotesIcon,
  // Legacy keys
  Invoices: ChartPieIcon,
  Quote: WalletIcon,
  paid: CreditCardIcon,
  Unpaid: BanknotesIcon,
};

const colorMap = {
  Profit: { bg: 'var(--color-success-light)', icon: 'var(--color-success)' },
  Sales: { bg: 'var(--color-info-light)', icon: 'var(--color-info)' },
  Payments: { bg: 'var(--color-danger-light)', icon: 'var(--color-danger)' },
  Transactions: { bg: 'var(--color-primary-light)', icon: 'var(--color-primary)' },
  // Legacy keys
  Invoices: { bg: 'var(--color-primary-light)', icon: 'var(--color-primary)' },
  Quote: { bg: 'var(--color-info-light)', icon: 'var(--color-info)' },
  paid: { bg: 'var(--color-success-light)', icon: 'var(--color-success)' },
  Unpaid: { bg: 'var(--color-danger-light)', icon: 'var(--color-danger)' },
};

export default function SummaryCard({
  title,
  data,
  prefix,
  isLoading = false,
  growth,
  growthDirection,
}) {
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const IconComponent = iconMap[title] || ChartPieIcon;
  const colors = colorMap[title] || colorMap.Profit;
  const isPositive = growthDirection !== 'down';

  return (
    <div className="crm-dashboard-card" style={{ padding: '20px 24px', height: '100%' }}>
      {/* Top: Icon + More */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: colors.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComponent style={{ width: '22px', height: '22px', color: colors.icon }} />
        </div>

        {/* Three-dot menu placeholder */}
        <span style={{ color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>⋮</span>
      </div>

      {/* Title */}
      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          margin: '0 0 4px',
          textTransform: 'capitalize',
        }}
      >
        {title}
      </p>

      {/* Value */}
      {isLoading ? (
        <Spin size="small" />
      ) : (
        <Tooltip title={data} placement="bottom">
          <span
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.5px',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            {data
              ? moneyFormatter({
                  amount: data,
                  currency_code: money_format_settings?.default_currency_code,
                })
              : moneyFormatter({
                  amount: 0,
                  currency_code: money_format_settings?.default_currency_code,
                })}
          </span>
        </Tooltip>
      )}

      {/* Growth indicator */}
      {growth && (
        <div className={`stat-growth ${isPositive ? 'positive' : 'negative'}`}>
          <span style={{ fontSize: '12px', marginRight: '2px' }}>
            {isPositive ? '↑' : '↓'}
          </span>
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            {growth}
          </span>
        </div>
      )}

      {/* Prefix/subtitle */}
      {prefix && !growth && (
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-tertiary)',
            fontWeight: 'var(--font-weight-normal)',
          }}
        >
          {prefix}
        </span>
      )}
    </div>
  );
}
