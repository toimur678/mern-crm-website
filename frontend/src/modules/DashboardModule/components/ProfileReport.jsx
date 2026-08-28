import React from 'react';
import Chart from 'react-apexcharts';
import { profileData } from '../seedMockData';

const ProfileReport = () => {
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      dropShadow: { enabled: true, top: 2, left: 0, blur: 4, opacity: 0.15 }
    },
    colors: ['#ffab00'],
    stroke: { width: 4, curve: 'smooth' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: false },
  };

  const chartSeries = [{
    name: 'Growth',
    data: [10, 22, 15, 35, 28, 45]
  }];

  return (
    <div className="crm-dashboard-card" style={{ padding: '24px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div>
        <h5 style={{ color: 'var(--text-primary)', margin: '0 0 16px 0', fontSize: '1.125rem', fontWeight: 600 }}>Profile Report</h5>
        <span style={{ 
          backgroundColor: '#fff2d6', 
          color: '#ffab00', 
          padding: '4px 12px', 
          borderRadius: '4px', 
          fontSize: '0.8125rem',
          fontWeight: 600
        }}>
          YEAR 2022
        </span>
      </div>
      
      <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '0 0 8px 0', color: 'var(--color-success)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '14px' }}>↑</span> 68.2%
          </p>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600 }}>$84,686k</h3>
        </div>
        
        <div style={{ width: '130px', margin: '-10px -10px -10px 0' }}>
          <Chart options={chartOptions} series={chartSeries} type="line" height={100} />
        </div>
      </div>
    </div>
  );
};

export default ProfileReport;
