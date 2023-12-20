import { render, screen } from '@testing-library/react';
import { Basket } from './basket';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeProducts } from '../../mocks/mocks';
import { Status } from '../../const';

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
          uniqueBasketProducts: [],
          isAddItemSuccessModalActive: false,
          isBasketRemoveModalActive: false,
          productToRemove: null,
          setCouponSendingStatus: Status.Unsent,
          discount: 0,
          coupon: '',
          isCouponValid: false,
          order: null,
          orderPostingStatus: Status.Unsent,
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByTestId(basketElementByTestId)).toBeInTheDocument();
  });
});
