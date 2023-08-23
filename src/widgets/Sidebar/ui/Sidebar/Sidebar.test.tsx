import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Sidebar } from '../../ui/Sidebar/Sidebar';

describe('Sidebar', () => {
  test('with only first param', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
  test('with only first param', () => {
    componentRender(<Sidebar />);
    const btn = screen.getByTestId('toggle-btn');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
