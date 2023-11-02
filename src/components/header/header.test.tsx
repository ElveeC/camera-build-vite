import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { withHistory } from '../../mocks/mock-component';

describe('Component: Header', () => {

  it('should render correctly', () => {
    const expectedCatalogText = 'Каталог';
    const expectedWarrantyText = 'Гарантии';
    const expecteDeliveryText = 'Доставка';
    const expectedAboutText = 'О компании';
    const searchFormElement = 'searchFormElement';
    const expectedSearchPlaceholderText = 'Поиск по сайту';

    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
    expect(screen.getByText(expectedWarrantyText)).toBeInTheDocument();
    expect(screen.getByText(expecteDeliveryText)).toBeInTheDocument();
    expect(screen.getByText(expectedAboutText)).toBeInTheDocument();
    expect(screen.getByTestId(searchFormElement)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedSearchPlaceholderText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
