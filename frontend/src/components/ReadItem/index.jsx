import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { dataForRead } from '@/utils/dataStructure';
import { useCrudContext } from '@/context/crud';
import { selectCurrentItem } from '@/redux/crud/selectors';
import { get } from '@/utils/helpers';
import useLanguage from '@/locale/useLanguage';
import { useDate } from '@/settings';

export default function ReadItem({ config }) {
  const { dateFormat } = useDate();
  const translate = useLanguage();
  const { result } = useSelector(selectCurrentItem);
  const { state: { isReadBoxOpen } } = useCrudContext();
  const columns = config.fields ? dataForRead({ fields: config.fields, translate }) : config.readColumns || [];
  if (!isReadBoxOpen) return null;
  return <dl className="record-read-details">{columns.map((column) => {
    let value = get(result, column.dataIndex);
    if (column.isDate && value) value = dayjs(value).format(dateFormat);
    if (typeof value === 'boolean') value = value ? 'Yes' : 'No';
    return <div key={column.dataIndex}><dt>{column.title}</dt><dd>{value ?? 'Not provided'}</dd></div>;
  })}</dl>;
}
