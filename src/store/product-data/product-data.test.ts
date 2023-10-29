import { fetchProductsAction } from '../api-actions';
import { productData } from './product-data';
import { /*makeFakeProduct,*/ makeFakeProducts } from '../../mocks/mocks';

describe('ProductData Slice', () => {
  const initialState = {
    products: [],
    areProductsLoading: false,
    product: null,
    isProductLoading: false,
    selectedProduct: null,
    hasError: false
  };

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = {...initialState};

    const result = productData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return the default initial state with an empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {...initialState};

    const result = productData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "areProductsLoading" to "true" with "fetchProductsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      areProductsLoading: true,
    };

    const result = productData.reducer(undefined, fetchProductsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "products" to an array with products, "areProductsLoading" to "false" with "fetchProductsAction.fulfilled"', () => {
    const mockProducts = makeFakeProducts();
    const expectedState = {
      ...initialState,
      products: mockProducts
    };

    const result = productData.reducer(
      undefined,
      fetchProductsAction.fulfilled(
        mockProducts, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "areProductsLoading" to "false" with "fetchProductsAction.rejected', () => {
    const expectedState = {
      ...initialState,
      hasError: true
    };

    const result = productData.reducer(
      undefined,
      fetchProductsAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});


