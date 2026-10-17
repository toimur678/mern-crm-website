import CrudModule from '@/modules/CrudModule/CrudModule';
import TaxForm from '@/forms/TaxForm';

const fields = {
  taxName: { type: 'string', label: 'Tax name' },
  taxValue: { type: 'number', label: 'Rate (%)' },
  enabled: { type: 'boolean', label: 'Enabled' },
  isDefault: { type: 'boolean', label: 'Default rate' },
};

export default function Taxes() {
  const config = {
    entity: 'taxes', fields,
    searchConfig: { displayLabels: ['taxName'], searchFields: 'taxName' },
    deleteModalLabels: ['taxName'],
    PANEL_TITLE: 'Tax rate', DATATABLE_TITLE: 'Taxes',
    ADD_NEW_ENTITY: 'Add tax rate', ENTITY_NAME: 'tax rate',
    PAGE_DESCRIPTION: 'Manage the tax rates you apply to your products and services.',
  };
  return <CrudModule config={config} createForm={<TaxForm />} updateForm={<TaxForm isUpdateForm />} />;
}
