import React from 'react';
import { transactionsData } from '../seedMockData';
import { CreditCardIcon, WalletIcon, ArrowsRightLeftIcon, BanknotesIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const TransactionsList = () => {
  return (
    <div className="chart-card crm-dashboard-card" style={{ padding: '24px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.125rem' }}>Transactions</h5>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <EllipsisVerticalIcon width={24} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="transaction-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <CreditCardIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Paypal</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Send money</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>+82.6 USD</span>
        </div>

        <div className="transaction-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-info)' }}>
              <WalletIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Wallet</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mac'D</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>+270.69 USD</span>
        </div>

        <div className="transaction-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)' }}>
              <ArrowsRightLeftIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Transfer</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Refund</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>+637.91 USD</span>
        </div>

        <div className="transaction-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-warning-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-warning)' }}>
              <BanknotesIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Credit Card</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ordered Food</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>-838.71 USD</span>
        </div>
        
        <div className="transaction-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-info)' }}>
              <WalletIcon width={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Wallet</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Starbucks</p>
            </div>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>+203.33 USD</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
