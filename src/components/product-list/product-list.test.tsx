import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { ProductList } from './product-list';
import { makeFakeProducts } from '../../mocks/mocks';

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
          isAddItemSuccessModalActive: false
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(productListElement)).toBeInTheDocument();
  });
});
