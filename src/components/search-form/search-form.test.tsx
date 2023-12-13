import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { SearchForm } from './search-form';
import { makeFakeProducts } from '../../mocks/mocks';

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
        isAddItemSuccessModalActive: false
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedSearchFormElement)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
