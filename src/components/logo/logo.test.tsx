import { render, screen } from '@testing-library/react';
import { Logo } from './logo';
import { withHistory } from '../../mocks/mock-component';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedLinkText = 'Переход на главную';

    render(withHistory(<Logo />));

    expect(screen.getByLabelText(expectedLinkText)).toBeInTheDocument();
  });
});
