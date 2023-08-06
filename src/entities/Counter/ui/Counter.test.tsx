import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter.test', () => {
  test('Initial', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    const decBtn = screen.getByTestId('decrementBtn');
    const incBtn = screen.getByTestId('incrementBtn');
    const value = screen.getByTestId('counterValue');
    expect(value).toHaveTextContent('10');
    fireEvent.click(decBtn);
    expect(value).toHaveTextContent('9');
    fireEvent.click(incBtn);
    expect(value).toHaveTextContent('10');
  });
  test('Increment', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    const incBtn = screen.getByTestId('incrementBtn');
    const value = screen.getByTestId('counterValue');
    expect(value).toHaveTextContent('10');
    fireEvent.click(incBtn);
    expect(value).toHaveTextContent('11');
  });
  test('Decrement', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    const decBtn = screen.getByTestId('decrementBtn');
    const value = screen.getByTestId('counterValue');
    expect(value).toHaveTextContent('10');
    fireEvent.click(decBtn);
    expect(value).toHaveTextContent('9');
  });
});
