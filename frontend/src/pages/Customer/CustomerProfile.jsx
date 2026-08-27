import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request } from '@/request';
import useLanguage from '@/locale/useLanguage';
import { Avatar, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Card from '@/components/Card';
import TabsContent from '@/components/TabsContent/TabsContent';
import ProgressBar from '@/components/ProgressBar';
import { DocumentTextIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const translate = useLanguage();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await request.read({ entity: 'client', id });
        setCustomer(response.result);
      } catch (error) {
        console.error('Error fetching customer', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!customer) {
    return <div>{translate('No customer found')}</div>;
  }

  const tabContent = [
    {
      key: 'overview',
      label: translate('Overview'),
      icon: <DocumentTextIcon style={{ width: 16 }} />,
      children: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          {/* Left Column - Activity/Records */}
          <div style={{ gridColumn: 'span 8' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '16px' }}>
              RECENT ACTIVITY
            </h3>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Mock Activity Items using real customer name */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ backgroundColor: 'var(--bg-app)', padding: '12px', borderRadius: '50%' }}>
                      <DocumentTextIcon style={{ width: 24, color: 'var(--color-primary)' }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Invoice #INV-2024-001</p>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Billed to {customer.name}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', width: '150px' }}>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>$2,450.00</p>
                    <ProgressBar value={75} color="var(--color-success)" />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ backgroundColor: '#FEE2E2', padding: '12px', borderRadius: '50%' }}>
                      <ExclamationCircleIcon style={{ width: 24, color: 'var(--color-warning)' }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Quote #QT-2024-089</p>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Pending Approval</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', width: '150px' }}>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>$1,200.00</p>
                    <ProgressBar value={20} color="var(--color-warning)" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Analytics */}
          <div style={{ gridColumn: 'span 4' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '16px' }}>
              SUMMARY
            </h3>
            <Card style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Account Health</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircleIcon style={{ width: 24, color: 'var(--color-success)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Good Standing</span>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Payment Completion</span>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>92%</span>
                  </div>
                  <ProgressBar value={92} color="var(--color-success)" />
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Details</p>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Email</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>{customer.email || 'N/A'}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Phone</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>{customer.phone || 'N/A'}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Company</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>{customer.company || 'N/A'}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    },
    {
      key: 'invoices',
      label: translate('Invoices'),
      icon: <DocumentTextIcon style={{ width: 16 }} />,
      children: (
        <div>
           <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Invoices for {customer.name}</h3>
           <p style={{ color: 'var(--text-secondary)' }}>Invoice data integration goes here.</p>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div 
        onClick={() => navigate(-1)} 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}
      >
        <ArrowLeftOutlined />
        <span>Back to Clients</span>
      </div>

      <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Avatar size={64} style={{ backgroundColor: 'var(--color-primary)', fontSize: '24px' }}>
            {customer.name?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {customer.name} {customer.surname}
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
              {customer.company ? `Client at ${customer.company}` : 'Client Profile'} • Added recently
            </p>
          </div>
        </div>
      </Card>

      <TabsContent content={tabContent} />
    </div>
  );
}
