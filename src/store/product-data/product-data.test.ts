import { fetchProductsAction, fetchProductAction } from '../api-actions';
import { productData, resetSelectedProduct, setSelectedProduct } from './product-data';
import { makeFakeProduct, makeFakeProducts } from '../../mocks/mocks';

describe('ProductData Slice', () => {
  const initialState = {
    products: [],
    areProductsLoading: false,
    product: null,
    isProductLoading: false,
    selectedProduct: null,
    hasError: false
  };
  describe('fetchProductsAction', () => {
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
        products: mockProducts,
        areProductsLoading: false
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
        areProductsLoading: false,
        hasError: true
      };

      const result = productData.reducer(
        undefined,
        fetchProductsAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchProductAction', () => {
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

    it('should set "isProductLoading" to "true" with "fetchProductAction.pending"', () => {
      const expectedState = {
        ...initialState,
        isProductLoading: true,
      };

      const result = productData.reducer(undefined, fetchProductAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "product", "isProductLoading" to "false" with "fetchProductAction.fulfilled"', () => {
      const mockProduct = makeFakeProduct();
      const expectedState = {
        ...initialState,
        product: mockProduct,
        isProductLoading: false
      };

      const result = productData.reducer({...initialState}, {type: fetchProductAction.fulfilled.type, payload: mockProduct});

      expect(result).toEqual(expectedState);
    });

    it('should set "isProductsLoading" to "false" with "fetchProductAction.rejected', () => {
      const expectedState = {
        ...initialState,
        isProductLoading: false
      };

      const result = productData.reducer(
        undefined,
        fetchProductAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  it('should set "selectedProduct"', () => {
    const mockProduct = makeFakeProduct();
    const expectedState = {
      ...initialState,
      selectedProduct: mockProduct,
    };

    const result = productData.reducer({...initialState}, {type: setSelectedProduct, payload: mockProduct});

    expect(result).toEqual(expectedState);
  });

  it('should reset "selectedProduct" to null', () => {
    const selectedProduct = makeFakeProduct();
    const initialStateWithSelectedProduct = {
      ...initialState,
      selectedProduct: selectedProduct
    };
    const expectedState = {...initialState};

    const result = productData.reducer({...initialStateWithSelectedProduct}, {type: resetSelectedProduct, selectedProduct: null});

    expect(result).toEqual(expectedState);
  });

});


