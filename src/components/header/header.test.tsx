import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeProducts } from '../../mocks/mocks';

describe('Component: Header', () => {
  const products = makeFakeProducts();

  it('should render correctly', () => {
    const expectedCatalogText = 'Каталог';
    const expectedWarrantyText = 'Гарантии';
    const expecteDeliveryText = 'Доставка';
    const expectedAboutText = 'О компании';
    const searchFormElement = 'searchFormElement';
    const expectedSearchPlaceholderText = 'Поиск по сайту';

    const {withStoreComponent} = withStore(
      <Header />, {
        DATA: {
          products: products,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
          selectedProducts: [],
          isAddItemSuccessModalActive: false
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
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
