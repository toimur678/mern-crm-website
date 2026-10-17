import currency from 'currency.js';
import { useSelector } from 'react-redux';
import storePersist from '@/redux/storePersist';
import { selectMoneyFormat } from '@/redux/settings/selectors';

export default function useMoney() {
  const settings = useSelector(selectMoneyFormat);
  const format = settings && Object.keys(settings).length ? settings : storePersist.get('settings')?.money_format_settings || {};
  const defaultCode = format.default_currency_code || format.currency_code || 'USD';

  function currencyFormat({ amount = 0 }) {
    return currency(amount, {
      separator: format.thousand_sep ?? ',',
      decimal: format.decimal_sep ?? '.',
      symbol: '',
      precision: format.cent_precision ?? 2,
    }).format();
  }

  function moneyFormatter({ amount = 0, currency_code = defaultCode }) {
    // Preserve the user's number formatting; never label another currency with
    // the workspace's default symbol.
    const symbol = currency_code === defaultCode ? format.currency_symbol || currency_code : currency_code;
    const number = currencyFormat({ amount });
    return format.currency_position === 'before' ? `${symbol} ${number}` : `${number} ${symbol}`;
  }

  function moneyRowFormatter(value) {
    return { props: { style: { textAlign: 'right', whiteSpace: 'nowrap', direction: 'ltr' } }, children: moneyFormatter(value) };
  }

  return {
    moneyRowFormatter, moneyFormatter, amountFormatter: currencyFormat,
    currency_symbol: format.currency_symbol || defaultCode,
    currency_code: defaultCode,
    currency_position: format.currency_position,
    decimal_sep: format.decimal_sep, thousand_sep: format.thousand_sep,
    cent_precision: format.cent_precision, zero_format: format.zero_format,
  };
}
