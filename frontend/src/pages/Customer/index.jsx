import CrudModule from '@/modules/CrudModule/CrudModule';
import CustomerForm from './CustomerForm';
import { fields } from './config';


export default function Customer() {
  const entity = 'client';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name,email,phone',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: 'Customer',
    DATATABLE_TITLE: 'Customers',
    ADD_NEW_ENTITY: 'Add customer',
    ENTITY_NAME: 'Customer',
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
    PAGE_DESCRIPTION: 'Good relationships start with the details. Keep your customers close.',
  };
  return (
    <CrudModule
      createForm={<CustomerForm />}
      updateForm={<CustomerForm />}
      config={config}
    />
  );
}
