import React from 'react';
import RevenueChart from './RevenueChart';
import GrowthRadial from './GrowthRadial';

export default function TotalRevenueCard() {
  return (
    <div className="total-revenue-card" style={{ 
      display: 'flex', 
      backgroundColor: 'var(--bg-surface)', 
      borderRadius: 'var(--radius-card)', 
      boxShadow: 'var(--shadow-card)',
      height: '100%',
      overflow: 'hidden'
    }}>
      <div className="total-revenue-left">
        <RevenueChart />
      </div>
      <div className="total-revenue-right">
        <GrowthRadial />
      </div>
    </div>
  );
}
