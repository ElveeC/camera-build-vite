import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { BasketList } from './basket-list';
import { makeFakeProducts } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: BasketList', () => {

  const products = makeFakeProducts();

  it('should not render if there are no products in the basket', () => {

    const notExpectedBasketListElement = 'basketListElement';

    const {withStoreComponent} = withStore(
      <BasketList />, {
        DATA: {
          products: products,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
          selectedProducts: [],
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

    expect(screen.queryByTestId(notExpectedBasketListElement)).not.toBeInTheDocument();
  });

  it('should render correctly if there are products in the basket', () => {

    const basketListElement = 'basketListElement';

    const {withStoreComponent} = withStore(
      <BasketList />, {
        DATA: {
          products: products,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
          selectedProducts: products,
          uniqueBasketProducts: products,
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

    expect(screen.getByTestId(basketListElement)).toBeInTheDocument();
  });
});
