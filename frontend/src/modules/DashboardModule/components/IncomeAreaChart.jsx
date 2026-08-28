import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { incomeData } from '../seedMockData';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const IncomeAreaChart = () => {
  const [activeTab, setActiveTab] = useState('Income');

  const tabs = ['Income', 'Expenses', 'Profit'];

  const chartData = {
    Income: { color: '#696cff', data: [24, 21, 30, 22, 42, 26, 35, 29] },
    Expenses: { color: '#ff3e1d', data: [15, 28, 12, 38, 20, 45, 18, 32] },
    Profit: { color: '#71dd37', data: [9, -7, 18, -16, 22, -19, 17, -3] }
  };

  const chartOptions = {
    chart: { type: 'area', toolbar: { show: false }, parentHeightOffset: 0 },
    colors: [chartData[activeTab].color],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: 'var(--text-tertiary)' } }
    },
    yaxis: { labels: { show: false } },
    grid: { borderColor: '#eceef1', strokeDashArray: 3, padding: { top: -20, bottom: -8, left: -10, right: 8 } },
  };

  const chartSeries = [{
    name: activeTab,
    data: chartData[activeTab].data
  }];

  return (
    <div className="chart-card crm-dashboard-card" style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
      <div className="dashboard-tabs" style={{ display: 'flex', borderBottom: '1px solid #eceef1' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`dashboard-tab ${activeTab === tab ? 'active' : ''}`}
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              backgroundColor: activeTab === tab ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
            <ChartBarIcon width={28} />
          </div>
          <div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Balance</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600 }}>$459.10</h4>
              <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '0.875rem' }}>↑ 42.9%</span>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <Chart options={chartOptions} series={chartSeries} type="area" height={200} />
        </div>
      </div>
    </div>
  );
};

export default IncomeAreaChart;
