import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { BasketProduct } from './basket-product';
import { makeFakeProduct } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: BasketProduct', () => {

  const product = makeFakeProduct();

  it('should render correctly', () => {
    const { name, category, level, vendorCode } = product;

    const expectedAltText = `${name}.`;
    const expectedVendorCodeText = 'Артикул:';
    const expectedVendorCode = `${vendorCode}`;
    const expectedCategory = `${category}`;
    const expectedLevel = `${level} уровень`;
    const expectedPriceText = 'Цена:';
    const expectedTotalText = 'Общая цена:';


    const {withStoreComponent} = withStore(
      <BasketProduct product={product}/>, {
        DATA: {
          products: [],
          areProductsLoading: false,
          product: product,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
          selectedProducts: [product],
          uniqueBasketProducts: [product],
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

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedVendorCodeText)).toBeInTheDocument();
    expect(screen.getByText(expectedVendorCode)).toBeInTheDocument();
    expect(screen.getByText(expectedCategory)).toBeInTheDocument();
    expect(screen.getByText(expectedLevel)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByText(expectedTotalText)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(3);
  });

});
