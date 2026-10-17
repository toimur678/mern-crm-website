import { useEffect, useState } from 'react';
import { request } from '@/request';
import { useNavigate } from 'react-router-dom';
import { Select, Empty } from 'antd';

export default function AutoCompleteAsync({ entity, displayLabels = ['name'], searchFields = 'name', outputValue = '_id', redirectLabel = 'Add new', withRedirect = false, urlToRedirect = '/', value, onChange, placeholder = 'Search customers…' }) {
  const [options, setOptions] = useState([]);
  const [selection, setSelection] = useState();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      const response = await request.search({ entity, options: { q: query, fields: searchFields } });
      if (active) { setOptions(response?.success ? response.result || [] : []); setLoading(false); }
    }, query ? 300 : 0);
    return () => { active = false; clearTimeout(timer); };
  }, [entity, query, searchFields]);
  useEffect(() => { setSelection(value?.[outputValue] ?? value); }, [value, outputValue]);
  const availableOptions = value && typeof value === 'object' && !options.some((option) => option[outputValue] === value[outputValue]) ? [value, ...options] : options;
  return <Select showSearch allowClear loading={loading} value={selection} aria-label={placeholder} placeholder={placeholder} filterOption={false} onSearch={setQuery} style={{ width: '100%', minWidth: 180 }} notFoundContent={loading ? 'Searching…' : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No customers found" />} options={[
    ...availableOptions.map((option) => ({ value: option[outputValue], label: displayLabels.map((label) => option[label]).filter(Boolean).join(' ') })),
    ...(withRedirect ? [{ value: 'redirectURL', label: `+ ${redirectLabel}` }] : []),
  ]} onChange={(nextValue) => {
    if (nextValue === 'redirectURL') { navigate(urlToRedirect); return; }
    setSelection(nextValue); onChange?.(nextValue);
    if (!nextValue) setQuery('');
  }} />;
}
