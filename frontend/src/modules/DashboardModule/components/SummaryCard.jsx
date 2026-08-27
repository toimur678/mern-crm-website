import { Divider, Row, Col, Spin, Tooltip } from 'antd';
import { useMoney } from '@/settings';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';
import {
  DocumentTextIcon,
  DocumentDuplicateIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  Invoices: DocumentTextIcon,
  Quote: DocumentDuplicateIcon,
  paid: CreditCardIcon,
  Unpaid: ExclamationTriangleIcon,
};

const colorMap = {
  Invoices: { bg: '#EEF0FF', icon: '#5B6ABF', accent: 'var(--color-primary)' },
  Quote: { bg: '#F0F7FF', icon: '#3B82F6', accent: '#3B82F6' },
  paid: { bg: '#ECFDF5', icon: '#34C77B', accent: '#34C77B' },
  Unpaid: { bg: '#FEF2F2', icon: '#EF4444', accent: '#EF4444' },
};

export default function AnalyticSummaryCard({ title, tagColor, data, prefix, isLoading = false }) {
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const IconComponent = iconMap[title] || DocumentTextIcon;
  const colors = colorMap[title] || colorMap.Invoices;

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 12 }}
      lg={{ span: 6 }}
    >
      <div className="stat-card" style={{ minHeight: '140px' }}>
        {/* Icon & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
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
            <IconComponent style={{ width: '20px', height: '20px', color: colors.icon }} />
          </div>
          <div>
            <h3
              style={{
                color: 'var(--text-primary)',
                fontSize: 'var(--font-size-md)',
                margin: 0,
                fontWeight: 'var(--font-weight-semibold)',
                textTransform: 'capitalize',
              }}
            >
              {title}
            </h3>
            <span style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-tertiary)',
              fontWeight: 'var(--font-weight-normal)',
            }}>
              {prefix}
            </span>
          </div>
        </div>

        {/* Value */}
        <div style={{ marginTop: 'auto' }}>
          {isLoading ? (
            <Spin size="small" />
          ) : (
            <Tooltip title={data} placement="bottom">
              <span
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.5px',
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
        </div>

        {/* Accent bar at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '20px',
            right: '20px',
            height: '3px',
            background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
            borderRadius: '3px 3px 0 0',
            opacity: 0.5,
          }}
        />
      </div>
    </Col>
  );
}
