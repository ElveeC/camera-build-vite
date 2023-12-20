import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { Catalog } from './catalog';
import { makeFakeProducts, makeFakePromos } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: Catalog', () => {
  const mockProducts = makeFakeProducts();
  const mockPromoProducts = makeFakePromos();

  it('should render correctly with fetchProductsAction.fulfilled', () => {
    const {withStoreComponent} = withStore(<Catalog />, {
      DATA: {
        products: mockProducts,
        areProductsLoading: false,
        product: null,
        isProductLoading: false,
        selectedProduct: null,
        hasError: false,
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
      PROMO: {
        promoProducts: mockPromoProducts,
        arePromoProductsLoading: false
      },
    });

    const expectedText = 'Каталог фото- и видеотехники';
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
