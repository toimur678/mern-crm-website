import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Avatar, Button, Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { Squares2X2Icon, UsersIcon, DocumentTextIcon, CreditCardIcon, Cog6ToothIcon, BanknotesIcon, ReceiptPercentIcon, Bars3Icon, ArrowUpRightIcon, ChevronUpDownIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';
import useResponsive from '@/hooks/useResponsive';

export const workspacePages = [
  { label: 'Overview', path: '/', icon: Squares2X2Icon, end: true, keywords: 'dashboard home revenue' },
  { label: 'Customers', path: '/customer', icon: UsersIcon, keywords: 'clients contacts people' },
  { label: 'Invoices', path: '/invoice', icon: DocumentTextIcon, keywords: 'billing sales documents' },
  { label: 'Payments', path: '/payment', icon: CreditCardIcon, end: true, keywords: 'transactions income' },
  { label: 'Payment methods', path: '/payment/mode', icon: BanknotesIcon, keywords: 'bank cash transfer' },
  { label: 'Taxes', path: '/taxes', icon: ReceiptPercentIcon, keywords: 'rates vat tax' },
  { label: 'Settings', path: '/settings', icon: Cog6ToothIcon, keywords: 'company currency preferences' },
];

export function Brand() {
  return <NavLink to="/" className="workspace-brand" aria-label="Nexus CRM home"><span className="brand-mark"><Square3Stack3DIcon /></span><span>nexus<span className="brand-dot">.</span></span><span className="brand-caption">CRM</span></NavLink>;
}

function SidebarContent({ onNavigate }) {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const company = useSelector(state => state.settings.result?.company_settings?.company_name);
  const link = page => <NavLink key={page.path} to={page.path} end={page.end} onClick={onNavigate} className={({ isActive }) => `workspace-nav-link${isActive ? ' is-active' : ''}`}><page.icon /><span>{page.label}</span>{page.path === '/' && <span className="nav-active-dot" />}</NavLink>;
  return <div className="sidebar-content">
    <Brand />
    <NavLink to="/settings" onClick={onNavigate} className="workspace-switcher"><span className="workspace-avatar">{(company || 'My workspace').slice(0, 1).toUpperCase()}</span><span><strong>{company || 'My workspace'}</strong><small>Business workspace</small></span><ChevronUpDownIcon /></NavLink>
    <nav aria-label="Main navigation"><p className="nav-section-label">WORKSPACE</p>{workspacePages.slice(0, 4).map(link)}<p className="nav-section-label nav-section-finance">MANAGE</p>{workspacePages.slice(4, 6).map(link)}</nav>
    <div className="sidebar-bottom">
      <div className="sidebar-tip"><span className="tip-symbol">✦</span><strong>Good business starts<br />with great connections.</strong><p>Keep your customers close and your next steps clear.</p><NavLink to="/customer" onClick={onNavigate}>Your customers <ArrowUpRightIcon /></NavLink></div>
      <nav aria-label="Workspace settings">{link(workspacePages[6])}</nav>
      <NavLink to="/profile" onClick={onNavigate} className="sidebar-profile"><Avatar size={35} style={{ background: '#e6eee9', color: '#375d4f', fontWeight: 600 }}>{currentAdmin?.name?.[0] || 'A'}</Avatar><span><strong>{[currentAdmin?.name, currentAdmin?.surname].filter(Boolean).join(' ') || 'Your account'}</strong><small>Manage your profile</small></span><ChevronUpDownIcon /></NavLink>
    </div>
  </div>;
}

export default function Navigation() {
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  if (!isMobile) return <aside className="workspace-sidebar"><SidebarContent /></aside>;
  return <>
    <Button type="text" className="mobile-nav-trigger" aria-label="Open navigation" aria-expanded={open} aria-controls={open ? 'mobile-navigation' : undefined} onClick={() => setOpen(true)} icon={<Bars3Icon />} />
    <Drawer title="Workspace navigation" width={280} placement="left" open={open} onClose={() => setOpen(false)} styles={{ body: { padding: 0 } }} className="workspace-mobile-drawer"><div id="mobile-navigation"><SidebarContent onNavigate={() => setOpen(false)} /></div></Drawer>
  </>;
}
