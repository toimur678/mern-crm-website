import CrudModule from '@/modules/CrudModule/CrudModule';
import PaymentModeForm from '@/forms/PaymentModeForm';

const fields = {
  name: { type: 'string', label: 'Payment method' },
  description: { type: 'string', label: 'Description' },
  enabled: { type: 'boolean', label: 'Enabled' },
  isDefault: { type: 'boolean', label: 'Default method' },
};

export default function PaymentMethods() {
  const config = {
    entity: 'paymentmode', fields,
    searchConfig: { displayLabels: ['name'], searchFields: 'name,description' },
    deleteModalLabels: ['name'],
    PANEL_TITLE: 'Payment method', DATATABLE_TITLE: 'Payment methods',
    ADD_NEW_ENTITY: 'Add payment method', ENTITY_NAME: 'payment method',
    PAGE_DESCRIPTION: 'Keep the ways you get paid organized and ready for every invoice.',
  };
  return <CrudModule config={config} createForm={<PaymentModeForm />} updateForm={<PaymentModeForm isUpdateForm />} />;
}
