import { useMemo } from 'react';
import { Col, Progress, Spin } from 'antd';
import useLanguage from '@/locale/useLanguage';

const colours = {
  draft: '#9CA3AF',
  sent: '#3B82F6',
  pending: '#F59E0B',
  unpaid: '#EF4444',
  overdue: '#DC2626',
  partially: '#8B5CF6',
  paid: '#34C77B',
  declined: '#EF4444',
  accepted: '#34C77B',
  cyan: '#06B6D4',
  purple: '#8B5CF6',
  expired: '#78716C',
};

const defaultStatistics = [
  { tag: 'draft', value: 0 },
  { tag: 'pending', value: 0 },
  { tag: 'sent', value: 0 },
  { tag: 'accepted', value: 0 },
  { tag: 'declined', value: 0 },
  { tag: 'expired', value: 0 },
];

const defaultInvoiceStatistics = [
  { tag: 'draft', value: 0 },
  { tag: 'pending', value: 0 },
  { tag: 'overdue', value: 0 },
  { tag: 'paid', value: 0 },
  { tag: 'unpaid', value: 0 },
  { tag: 'partially', value: 0 },
];

const PreviewState = ({ tag, value, color }) => {
  const translate = useLanguage();
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: color,
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)',
            textTransform: 'capitalize',
            fontWeight: 'var(--font-weight-medium)',
          }}>
            {translate(tag)}
          </span>
        </div>
        <span style={{
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
        }}>
          {value}%
        </span>
      </div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={color}
        trailColor="#F0F1F5"
        size="small"
        style={{ margin: 0 }}
      />
    </div>
  );
};

export default function PreviewCard({
  title = 'Preview',
  statistics = defaultStatistics,
  isLoading = false,
  entity = 'invoice',
}) {
  const statisticsMap = useMemo(() => {
    if (entity === 'invoice') {
      return defaultInvoiceStatistics.map((defaultStat) => {
        const matchedStat = Array.isArray(statistics)
          ? statistics.find((stat) => stat.tag === defaultStat.tag)
          : null;
        return matchedStat || defaultStat;
      });
    } else {
      return defaultStatistics.map((defaultStat) => {
        const matchedStat = Array.isArray(statistics)
          ? statistics.find((stat) => stat.tag === defaultStat.tag)
          : null;
        return matchedStat || defaultStat;
      });
    }
  }, [statistics, entity]);

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 12 }}
      lg={{ span: 12 }}
    >
      <div className="crm-dashboard-card" style={{ padding: '24px', height: '100%' }}>
        <h3
          style={{
            color: 'var(--text-primary)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: '24px',
            marginTop: 0,
          }}
        >
          {title}
        </h3>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin />
          </div>
        ) : (
          <div className="stagger-children">
            {statisticsMap?.map((status, index) => (
              <PreviewState
                key={index}
                tag={status.tag}
                value={status?.value}
                color={colours[status.tag] || '#9CA3AF'}
              />
            ))}
          </div>
        )}
      </div>
    </Col>
  );
}
