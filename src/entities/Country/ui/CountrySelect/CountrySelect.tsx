import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from 'entities/Country/model/types/country';
import { useTranslation } from 'react-i18next';

interface CountrySelectProps {
  className?: string;
  value?:string;
  onChange?: (country:Country) => void;
  readonly?: boolean;
}
const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo((props : CountrySelectProps) => {
  const { t } = useTranslation();
  const {
    className, value, onChange, readonly = false,
  } = props;
  const onChangeHandler = useCallback((value:string) => {
    onChange?.(value as Country);
  }, [onChange]);
  return (
    <Select
      label={t('Choose Country')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
      className={className}
    />
  );
});
