import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Select } from 'antd';
import { revenueData } from '../seedMockData';

export default function RevenueChart() {
  const [year, setYear] = useState('2025');

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'Public Sans, sans-serif'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '35%'
      }
    },
    colors: ['#696cff', '#03c3ec'],
    dataLabels: { enabled: false },
    grid: {
      borderColor: '#eceef1',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: { style: { colors: '#a1acb8' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: '#a1acb8' } }
    },
    legend: { show: false }
  };

  return (
    <div style={{ padding: '24px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h4 style={{ margin: 0, color: '#435971', fontSize: '1.125rem', fontWeight: 600 }}>Total Revenue</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#696cff' }}></span> <span style={{fontSize: '13px', color: '#a1acb8'}}>2025</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#03c3ec' }}></span> <span style={{fontSize: '13px', color: '#a1acb8'}}>2024</span>
          </div>
        </div>
      </div>
      <Chart options={options} series={revenueData.series} type="bar" height={300} />
    </div>
  );
}
