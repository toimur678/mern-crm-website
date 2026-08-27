import { Statistic, Progress, Divider, Row, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { UsersIcon } from '@heroicons/react/24/outline';

export default function CustomerPreviewCard({
  isLoading = false,
  activeCustomer = 0,
  newCustomer = 0,
}) {
  const translate = useLanguage();
  return (
    <Row className="gutter-row">
      <div
        className="whiteBox shadow"
        style={{
          height: 458,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
            marginTop: '8px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: '#EEF0FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <UsersIcon style={{ width: '18px', height: '18px', color: 'var(--color-primary)' }} />
            </div>
            <h3 style={{
              color: 'var(--text-primary)',
              margin: 0,
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)',
            }}>
              {translate('Customers')}
            </h3>
          </div>

          {isLoading ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Spin />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                flex: 1,
              }}
            >
              {/* Circular progress */}
              <Progress
                type="dashboard"
                percent={newCustomer}
                size={148}
                strokeColor={{
                  '0%': '#5B6ABF',
                  '100%': '#34C77B',
                }}
                trailColor="#F0F1F5"
                strokeWidth={8}
                format={(percent) => (
                  <div style={{ textAlign: 'center' }}>
                    <span style={{
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--text-primary)',
                    }}>
                      {percent}%
                    </span>
                  </div>
                )}
              />
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                margin: 0,
              }}>
                {translate('New Customer this Month')}
              </p>

              <Divider style={{ margin: '8px 0' }} />

              <Statistic
                title={
                  <span style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}>
                    {translate('Active Customer')}
                  </span>
                }
                value={activeCustomer}
                precision={2}
                valueStyle={{
                  color: activeCustomer > 0 ? 'var(--color-success)' : activeCustomer < 0 ? 'var(--color-danger)' : 'var(--text-primary)',
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                }}
                prefix={
                  activeCustomer > 0 ? (
                    <ArrowUpOutlined />
                  ) : activeCustomer < 0 ? (
                    <ArrowDownOutlined />
                  ) : null
                }
                suffix="%"
              />
            </div>
          )}
        </div>
      </div>
    </Row>
  );
}
