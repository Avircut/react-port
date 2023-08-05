import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import { renderWithTranslation } from '../../../../shared/lib/tests/renderWithTranslation';

describe('Sidebar', () => {
  test('with only first param', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
  test('with only first param', () => {
    renderWithTranslation(<Sidebar />);
    const btn = screen.getByTestId('toggle-btn');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
