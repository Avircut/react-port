import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(getCounterValue);
  const { t } = useTranslation();
  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };
  return (
    <div>
      <h1 data-testid="counterValue">{counterValue}</h1>
      <Button data-testid="incrementBtn" onClick={increment}>{t('Increment')}</Button>
      <Button data-testid="decrementBtn" onClick={decrement}>{t('Decrement')}</Button>
    </div>
  );
};
