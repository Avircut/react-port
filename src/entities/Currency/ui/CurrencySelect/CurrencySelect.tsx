import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Currency } from '../../model/types/сurrency';

interface CurrencySelectProps {
  className?: string;
  value?:string;
  onChange?: (currency:Currency) => void;
  readonly?: boolean;
}
const options = [
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props : CurrencySelectProps) => {
  const { t } = useTranslation();
  const {
    className, value, onChange, readonly = false,
  } = props;
  const onChangeHandler = useCallback((value:string) => {
    onChange?.(value as Currency);
  }, [onChange]);
  return (
    <Select
      label={t('Your currency')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
      className={className}
    />
  );
});
