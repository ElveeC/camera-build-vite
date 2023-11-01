import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './not-found-page';
import { withHistory } from '../../mocks/mock-component';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Мы не нашли такую страницу';
    const expectedText = 'Загляните в наш';
    const expectedLinkText = 'каталог';

    render(withHistory(<NotFoundPage />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
