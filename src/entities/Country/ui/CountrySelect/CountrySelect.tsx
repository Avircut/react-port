import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

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
    <Listbox
      defaultValue={t('Choose Country')}
      label={t('Choose Country')}
      items={options}
      value={value}
      onChange={onChangeHandler}
      className={className}
      readonly={readonly}
      direction="topRight"
    />
  );
});
