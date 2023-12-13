import { render, screen } from '@testing-library/react';
import { Basket } from './basket';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeProducts } from '../../mocks/mocks';

describe('Component: Basket', () => {
  const products = makeFakeProducts();
  it('should render correctly', () => {
    const expectedTitleText = 'Корзина';
    const basketElementByTestId = 'basketElement';

    const {withStoreComponent} = withStore(
      <Basket />, {
        DATA: {
          products: products,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          selectedProduct: null,
          selectedProducts: [],
          hasError: false,
          isAddItemSuccessModalActive: false
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByTestId(basketElementByTestId)).toBeInTheDocument();
  });
});
