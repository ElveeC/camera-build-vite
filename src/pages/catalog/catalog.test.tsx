import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { Catalog } from './catalog';
import { makeFakeProducts, makeFakePromos } from '../../mocks/mocks';

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
        isAddItemSuccessModalActive: false
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
