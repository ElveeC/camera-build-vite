import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { SearchForm } from './search-form';
import { makeFakeProducts } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: SearchForm', () => {
  const products = makeFakeProducts();

  it('should render correctly', () => {
    const expectedSearchFormElement = 'searchFormElement';

    const {withStoreComponent} = withStore(<SearchForm />, {
      DATA: {
        products: products,
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
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedSearchFormElement)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
