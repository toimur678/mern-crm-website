import React from 'react';
import Chart from 'react-apexcharts';
import { growthData } from '../seedMockData';

export default function GrowthRadial() {
  const options = {
    chart: {
      type: 'radialBar',
      fontFamily: 'Public Sans, sans-serif'
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        track: { background: '#eeeef0' },
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            color: '#a1acb8',
            offsetY: 20
          },
          value: {
            show: true,
            fontSize: '22px',
            color: '#435971',
            offsetY: -10,
            formatter: function (val) {
              return val + '%';
            }
          }
        }
      }
    },
    colors: ['#696cff'],
    stroke: { lineCap: 'round' },
    labels: ['Growth']
  };

  return (
    <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <div style={{ 
          border: '1px solid var(--border-color-light)', 
          borderRadius: '6px', 
          padding: '4px 12px', 
          color: 'var(--color-primary)', 
          fontSize: '13px', 
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          2025
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <Chart options={options} series={[growthData.percentage]} type="radialBar" height={220} width="100%" />
      
      <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>62% Company Growth</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ padding: '8px', backgroundColor: 'var(--color-primary-light)', borderRadius: '8px', color: 'var(--color-primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>2025</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>$32.5k</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ padding: '8px', backgroundColor: 'var(--color-info-light)', borderRadius: '8px', color: 'var(--color-info)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>2024</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>$41.2k</div>
          </div>
        </div>
      </div>
    </div>
  );
}
