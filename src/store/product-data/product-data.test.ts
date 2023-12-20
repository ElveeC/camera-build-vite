import { fetchProductsAction, fetchProductAction } from '../api-actions';
import { productData, resetSelectedProduct, setSelectedProduct, addProductToBasket, addToUniqueBasketList, removeProductFromBasket, removeProductFromUniqueList, setAddItemSuccessModalStatus, setBasketRemoveModalStatus, setProductToRemove, resetProductToRemove, setCoupon, resetCouponStatus, resetOrder, resetOrderStatus } from './product-data';
import { makeFakeProduct, makeFakeProducts } from '../../mocks/mocks';
import { Status } from '../../const';

describe('ProductData Slice', () => {
  const initialState = {
    products: [],
    areProductsLoading: false,
    product: null,
    isProductLoading: false,
    selectedProduct: null,
    selectedProducts: [],
    hasError: false,
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
      const newInitialState = {
        ...initialState,
        areProductsLoading: true
      };
      const expectedState = {
        ...initialState,
        products: mockProducts,
        areProductsLoading: false
      };

      const result = productData.reducer(
        {...newInitialState},
        fetchProductsAction.fulfilled(
          mockProducts, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "areProductsLoading" to "false", "hasError" to true with "fetchProductsAction.rejected', () => {
      const newInitialState = {
        ...initialState,
        areProductsLoading: true
      };
      const expectedState = {
        ...initialState,
        areProductsLoading: false,
        hasError: true
      };

      const result = productData.reducer(
        {...newInitialState},
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
      const newInitialState = {
        ...initialState,
        isProductLoading: true
      };
      const expectedState = {
        ...initialState,
        product: mockProduct,
        isProductLoading: false
      };

      const result = productData.reducer({...newInitialState}, {type: fetchProductAction.fulfilled.type, payload: mockProduct});

      expect(result).toEqual(expectedState);
    });

    it('should set "isProductsLoading" to "false" with "fetchProductAction.rejected', () => {
      const newInitialState = {
        ...initialState,
        isProductLoading: true
      };
      const expectedState = {
        ...initialState,
        isProductLoading: false
      };

      const result = productData.reducer(
        {...newInitialState},
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

  it('should add a product to the basket', () => {
    const product = makeFakeProduct();

    const expectedState = {
      ...initialState,
      selectedProducts: [product],
    };

    const result = productData.reducer({...initialState}, {type: addProductToBasket, payload: product});

    expect(result).toEqual(expectedState);
  });

  it('should add a new product to the UniqueBasketList', () => {
    const product = makeFakeProduct();
    const initialStateWithUniqueProducts = {
      ...initialState,
    };

    const expectedState = {
      ...initialState,
      uniqueBasketProducts: [product]
    };

    const result = productData.reducer({...initialStateWithUniqueProducts}, {type: addToUniqueBasketList, payload: product});

    expect(result).toEqual(expectedState);
  });

  it('should not add a product to the UniqueBasketList if the list already includes a product with this id', () => {
    const product = makeFakeProduct();
    const initialStateWithUniqueProducts = {
      ...initialState,
      uniqueBasketProducts: [product]
    };

    const result = productData.reducer({...initialStateWithUniqueProducts}, {type: addToUniqueBasketList, payload: product});

    expect(result).toEqual(initialStateWithUniqueProducts);
  });

  it('should remove a product from the basket', () => {
    const product = makeFakeProduct();
    const initialStateWithProductToRemove = {
      ...initialState,
      productToRemove: product,
      selectedProducts: [product],
    };

    const expectedState = {
      ...initialState,
      productToRemove: product,
      selectedProducts: [],
    };

    const result = productData.reducer({...initialStateWithProductToRemove}, {type: removeProductFromBasket, payload: product.id});

    expect(result).toEqual(expectedState);
  });

  it('should remove a product from the UniqueBasketList', () => {
    const product = makeFakeProduct();
    const initialStateWithProductToRemove = {
      ...initialState,
      productToRemove: product,
      uniqueBasketProducts: [product],
    };

    const expectedState = {
      ...initialState,
      productToRemove: product,
      uniqueBasketProducts: [],
    };

    const result = productData.reducer({...initialStateWithProductToRemove}, {type: removeProductFromUniqueList, payload: product.id});

    expect(result).toEqual(expectedState);
  });

  it('should set "isAddItemSuccessModalActive" to true', () => {
    const expectedState = {
      ...initialState,
      isAddItemSuccessModalActive: true,
    };

    const result = productData.reducer({...initialState}, {type: setAddItemSuccessModalStatus, payload: true});

    expect(result).toEqual(expectedState);
  });

  it('should set "isAddItemSuccessModalActive" to false', () => {
    const newInitialState = {
      ...initialState,
      isAddItemSuccessModalActive: true,
    };

    const expectedState = {
      ...initialState,
      isAddItemSuccessModalActive: false,
    };

    const result = productData.reducer({...newInitialState}, {type: setAddItemSuccessModalStatus, payload: false});

    expect(result).toEqual(expectedState);
  });

  it('should set "isBasketRemoveModalActive" to true', () => {
    const expectedState = {
      ...initialState,
      isBasketRemoveModalActive: true,
    };

    const result = productData.reducer({...initialState}, {type: setBasketRemoveModalStatus, payload: true});

    expect(result).toEqual(expectedState);
  });

  it('should set "isBasketRemoveModalActive" to false', () => {
    const newInitialState = {
      ...initialState,
      isBasketRemoveModalActive: true,
    };

    const expectedState = {
      ...initialState,
      isBasketRemoveModalActive: false,
    };

    const result = productData.reducer({...newInitialState}, {type: setBasketRemoveModalStatus, payload: false});

    expect(result).toEqual(expectedState);
  });

  it('should set "productToRemove"', () => {
    const mockProduct = makeFakeProduct();
    const expectedState = {
      ...initialState,
      productToRemove: mockProduct,
    };

    const result = productData.reducer({...initialState}, {type: setProductToRemove, payload: mockProduct});

    expect(result).toEqual(expectedState);
  });

  it('should set "productToRemove" to null', () => {
    const productToRemove = makeFakeProduct();
    const initialStateWithProductToRemove = {
      ...initialState,
      productToRemove: productToRemove
    };
    const expectedState = {...initialState};

    const result = productData.reducer({...initialStateWithProductToRemove}, {type: resetProductToRemove});

    expect(result).toEqual(expectedState);
  });

  it('should set "coupon"', () => {
    const mockCoupon = 'camera-333';
    const expectedState = {
      ...initialState,
      coupon: mockCoupon,
    };

    const result = productData.reducer({...initialState}, {type: setCoupon, payload: mockCoupon});

    expect(result).toEqual(expectedState);
  });

  it('should reset "CouponSendingStatus" to Status.Unsent', () => {
    const initialStateWithStatusSuccess = {
      ...initialState,
      setCouponSendingStatus: Status.Success
    };
    const expectedState = {...initialState};

    const result = productData.reducer({...initialStateWithStatusSuccess}, {type: resetCouponStatus});

    expect(result).toEqual(expectedState);
  });

  it('should reset an order after it was successfully posted', () => {
    const product = makeFakeProduct();
    const coupon = 'camera-333';
    const order = {camerasIds: [product.id], coupon: coupon};

    const initialStateWithOrder = {

      ...initialState,
      order: order,
      selectedProducts: [product],
      uniqueBasketProducts: [product],
      coupon: coupon,
      isCouponValid: true,
      discount: 15,
      setCouponSendingStatus: Status.Success
    };

    const result = productData.reducer({...initialStateWithOrder}, {type: resetOrder});

    expect(result).toEqual(initialState);
  });

  it('should reset "orderPostingStatus" to Status.Unsent', () => {
    const initialStateWithStatusSuccess = {
      ...initialState,
      orderPostingStatus: Status.Success
    };
    const expectedState = {...initialState};

    const result = productData.reducer({...initialStateWithStatusSuccess}, {type: resetOrderStatus});

    expect(result).toEqual(expectedState);
  });

});


