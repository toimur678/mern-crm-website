import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';
import useLanguage from '@/locale/useLanguage';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';


export default function InvoiceDataTableModule({ config }) {
  const translate = useLanguage();
  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        extra={[
          {
            label: translate('Record Payment'),
            key: 'recordPayment',
            icon: <Icon component={CreditCardIcon} />,
          },
        ]}
      ></ErpPanel>
    </ErpLayout>
  );
}
