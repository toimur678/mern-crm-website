import React from 'react';
import Chart from 'react-apexcharts';
import { orderData } from '../seedMockData';
import { ComputerDesktopIcon, ShoppingBagIcon, HomeIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

const OrderStatistics = () => {
  const chartOptions = {
    chart: { type: 'donut', height: 140 },
    labels: ['Electronic', 'Fashion', 'Decor', 'Sports'],
    colors: ['#696cff', '#03c3ec', '#ff3e1d', '#71dd37'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { fontSize: '14px' },
            value: { fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)' },
            total: {
              show: true,
              label: 'Weekly',
              formatter: function () {
                return '38%';
              }
            }
          }
        }
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { show: false }
  };

  const chartSeries = [45, 25, 20, 10];

  return (
    <div className="chart-card crm-dashboard-card" style={{ padding: '24px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.125rem' }}>Order Statistics</h5>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0', fontSize: '0.875rem' }}>42.82k Total Sales</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 600 }}>8,258</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Orders</p>
        </div>
        <div style={{ width: '140px' }}>
          <Chart options={chartOptions} series={chartSeries} type="donut" height={140} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <ComputerDesktopIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Electronic</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mobile, Earbuds, TV</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>82.5k</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-info)' }}>
              <ShoppingBagIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Fashion</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>T-shirt, Jeans, Shoes</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>23.8k</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)' }}>
              <HomeIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Decor</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Fine Art, Dining</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>849</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
              <PuzzlePieceIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Sports</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Football, Cricket Kit</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>99</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
