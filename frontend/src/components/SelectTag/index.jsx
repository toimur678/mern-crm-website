import { Select } from 'antd';
import { generate as uniqueId } from 'shortid';
import useLanguage from '@/locale/useLanguage';

export default function SelectTag({ options, defaultValue }) {
  const translate = useLanguage();

  return (
    <Select
      defaultValue={defaultValue}
      style={{
        width: '100%',
      }}
    >
      {options?.map((item) => {
        if (item && typeof item === 'object') {
          return (
            <Select.Option key={`${uniqueId()}`} value={item.value}>
              {translate ? translate(item.label) : item.label}
            </Select.Option>
          );
        }
        return (
          <Select.Option key={`${uniqueId()}`} value={item}>
            {item}
          </Select.Option>
        );
      })}
    </Select>
  );
}
