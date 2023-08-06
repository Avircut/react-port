import { StateSchema } from 'app/providers/StoreProvider';
import { CounterReducer, counterActions } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice', () => {
  test('Increment Action', () => {
    const state: CounterSchema = { value: 10 };
    expect(CounterReducer(state, counterActions.increment())).toEqual({ value: 11 });
  });
  test('Decrement Action', () => {
    const state: CounterSchema = { value: 10 };
    expect(CounterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
  });
  test('Should work with empty state', () => {
    expect(CounterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
  });
});
