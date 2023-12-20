import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { ProductList } from './product-list';
import { makeFakeProducts } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: ProductList', () => {

  const products = makeFakeProducts();

  it('should render correctly', () => {

    const productListElement = 'productListElement';

    const {withStoreComponent} = withStore(
      <ProductList products={products}/>, {
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

    expect(screen.getByTestId(productListElement)).toBeInTheDocument();
  });
});
