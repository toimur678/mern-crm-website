import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Empty, Input, Modal, Spin } from 'antd';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { FILE_BASE_URL } from '@/config/serverApiConfig';
import { workspacePages } from '@/apps/Navigation/NavigationContainer';
import { request } from '@/request';
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronRightIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, PlusIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';

export default function HeaderContent() {
  const admin = useSelector(selectCurrentAdmin);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const searchInput = useRef(null);
  const page = [...workspacePages].reverse().find(item => item.path !== '/' && location.pathname.startsWith(item.path));
  const title = location.pathname.startsWith('/profile') ? 'Your profile' : page?.label || 'Overview';
  useEffect(() => { document.title = `${title} · Nexus CRM`; }, [title]);
  const commands = [...workspacePages, { label: 'Create invoice', path: '/invoice/create', icon: PlusIcon, keywords: 'new add bill' }, { label: 'Your profile', path: '/profile', icon: UserIcon, keywords: 'account password' }].filter(item => `${item.label} ${item.keywords}`.toLowerCase().includes(query.toLowerCase().trim()));

  useEffect(() => {
    const handleKey = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(value => !value); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    let active = true;
    setCustomers([]);
    setSearchError(false);
    if (!searchOpen || query.trim().length < 2) { setLoading(false); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await request.search({ entity: 'client', options: { q: query.trim(), fields: 'name,email' } });
        if (active) { setCustomers(response?.result || []); setSearchError(!response || (response.success === false && response.result === null)); }
      } catch { if (active) setSearchError(true); }
      finally { if (active) setLoading(false); }
    }, 250);
    return () => { active = false; clearTimeout(timer); };
  }, [query, searchOpen]);

  const go = path => { setSearchOpen(false); setQuery(''); navigate(path); };
  const profileItems = [
    { key: 'identity', disabled: true, label: <span className="dropdown-identity"><strong>{admin?.name || 'Your account'}</strong><small>{admin?.email}</small></span> },
    { type: 'divider' },
    { key: 'profile', icon: <UserIcon width={16} />, label: <Link to="/profile">Your profile</Link> },
    { key: 'settings', icon: <Cog6ToothIcon width={16} />, label: <Link to="/settings">Workspace settings</Link> },
    { type: 'divider' },
    { key: 'logout', icon: <ArrowRightOnRectangleIcon width={16} />, label: <Link to="/logout">Sign out</Link> },
  ];

  return <>
    <header className="workspace-header">
      <div className="header-breadcrumb"><span>Workspace</span><ChevronRightIcon /><strong>{title}</strong></div>
      <div className="header-actions">
        <button type="button" className="workspace-search" onClick={() => setSearchOpen(true)}><MagnifyingGlassIcon /><span>Search anything...</span><kbd>⌘ K</kbd></button>
        <span className="header-divider" />
        <Dropdown menu={{ items: profileItems }} trigger={['click']} placement="bottomRight"><button type="button" className="header-profile" aria-label="Open account menu"><Avatar size={32} src={admin?.photo && FILE_BASE_URL ? FILE_BASE_URL + admin.photo : undefined} style={{ background: '#e9e4d9', color: '#6c5940', fontWeight: 600 }}>{admin?.name?.[0] || 'A'}</Avatar><ChevronDownIcon /></button></Dropdown>
      </div>
    </header>
    <Modal open={searchOpen} onCancel={() => setSearchOpen(false)} footer={null} title="Search your workspace" width={570} afterOpenChange={open => open && searchInput.current?.focus()} className="workspace-search-modal">
      <Input ref={searchInput} value={query} onChange={event => setQuery(event.target.value)} prefix={<MagnifyingGlassIcon width={18} />} placeholder="Find a page, action, or customer..." aria-label="Search pages and customers" size="large" allowClear />
      <div className="workspace-search-results">
        {commands.length > 0 && <><p className="search-section-label">PAGES & ACTIONS</p>{commands.map(item => <button type="button" key={item.path} className="search-result" onClick={() => go(item.path)}><item.icon /><span>{item.label}</span><ArrowUpRightIcon /></button>)}</>}
        {query.trim().length >= 2 && <><p className="search-section-label">CUSTOMERS {loading && <Spin size="small" />}</p>{customers.slice(0, 5).map(customer => <button type="button" key={customer._id} className="search-result" onClick={() => go(`/customer/read/${customer._id}`)}><UserIcon /><span>{customer.name}<small>{customer.email}</small></span><ArrowUpRightIcon /></button>)}{!loading && customers.length === 0 && <p className="search-hint">{searchError ? 'Customer search is unavailable. Please try again.' : 'No customers match this search.'}</p>}</>}
        {commands.length === 0 && query.trim().length < 2 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Type a page name or at least 2 characters to find a customer." />}
      </div>
      <p className="search-footer">Use Tab to move through results · Enter to open · Esc to close</p>
    </Modal>
  </>;
}
