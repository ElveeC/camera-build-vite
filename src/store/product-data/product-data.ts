import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, LocalStorage, Status } from '../../const';
import { fetchProductsAction, fetchProductAction, sendCouponAction, postOrderAction } from '../api-actions';
import { ProductDataType } from '../../types/state';
import { ProductType } from '../../types/product-type';
import { OrderType } from '../../types/order-type';

const initialState: ProductDataType = {
  products: [],
  areProductsLoading: false,
  product: null,
  isProductLoading: false,
  selectedProduct: null,
  selectedProducts: JSON.parse(localStorage.getItem(LocalStorage.SelectedProducts) || '[]') as ProductType[],
  uniqueBasketProducts: JSON.parse(localStorage.getItem(LocalStorage.UniqueBasketProducts) || '[]') as ProductType[],
  hasError: false,
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

export const productData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {

    setSelectedProduct: (state, action: PayloadAction<ProductType>) => {
      state.selectedProduct = action.payload;
    },

    resetSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    addProductToBasket: (state, action: PayloadAction<ProductType>) => {
      state.selectedProducts.push(action.payload);
      localStorage.setItem(LocalStorage.SelectedProducts, JSON.stringify(state.selectedProducts));
    },

    addToUniqueBasketList: (state, action: PayloadAction<ProductType>) => {
      if (!state.uniqueBasketProducts.length) {
        state.uniqueBasketProducts.push(action.payload);

      } else {
        if (!state.uniqueBasketProducts.find((uniqueProduct) => uniqueProduct.id === action.payload.id)) {
          state.uniqueBasketProducts.push(action.payload);
        }
      }
      localStorage.setItem(LocalStorage.UniqueBasketProducts, JSON.stringify(state.uniqueBasketProducts));
    },

    removeProductFromBasket: (state, action: PayloadAction<number>) => {
      state.selectedProducts = state.selectedProducts.filter((selectedProduct) => selectedProduct.id !== action.payload);
      localStorage.setItem(LocalStorage.SelectedProducts, JSON.stringify(state.selectedProducts));
    },

    removeProductFromUniqueList: (state, action: PayloadAction<number>) => {
      state.uniqueBasketProducts = state.uniqueBasketProducts.filter((uniqueProduct) => uniqueProduct.id !== action.payload);
      localStorage.setItem(LocalStorage.UniqueBasketProducts, JSON.stringify(state.uniqueBasketProducts));
    },

    setAddItemSuccessModalStatus: (state, action: PayloadAction<boolean>) => {
      state.isAddItemSuccessModalActive = action.payload;
    },

    setBasketRemoveModalStatus: (state, action: PayloadAction<boolean>) => {
      state.isBasketRemoveModalActive = action.payload;
    },

    setProductToRemove: (state, action: PayloadAction<ProductType>) => {
      state.productToRemove = action.payload;
    },

    resetProductToRemove: (state) => {
      state.selectedProduct = null;
    },

    setCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },

    resetCouponStatus: (state) => {
      state.setCouponSendingStatus = Status.Unsent;
    },

    setOrder: (state, action: PayloadAction<OrderType>) => {
      state.order = action.payload;
    },

    resetOrder: (state) => {
      state.order = null;
      state.selectedProducts = [];
      state.uniqueBasketProducts = [];
      state.setCouponSendingStatus = Status.Unsent;
      state.coupon = '';
      state.isCouponValid = false;
      state.discount = 0;
      localStorage.removeItem(LocalStorage.SelectedProducts);
      localStorage.removeItem(LocalStorage.UniqueBasketProducts);
    },

    resetOrderStatus: (state) => {
      state.orderPostingStatus = Status.Unsent;
    }
  },


  extraReducers(builder) {
    builder

      .addCase(fetchProductsAction.pending, (state) => {
        state.areProductsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.areProductsLoading = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.areProductsLoading = false;
        state.hasError = true;
      })

      .addCase(fetchProductAction.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isProductLoading = false;
      })

      .addCase(sendCouponAction.pending, (state) => {
        state.setCouponSendingStatus = Status.Pending;
        state.isCouponValid = false;
      })
      .addCase(sendCouponAction.fulfilled, (state, action) => {
        state.setCouponSendingStatus = Status.Success;
        state.discount = action.payload;
        state.isCouponValid = true;
      })
      .addCase(sendCouponAction.rejected, (state) => {
        state.setCouponSendingStatus = Status.Error;
        state.isCouponValid = false;
        state.discount = 0;
      })

      .addCase(postOrderAction.fulfilled, (state) => {
        state.orderPostingStatus = Status.Success;
      });
  }
});

export const { setSelectedProduct, resetSelectedProduct, addProductToBasket, addToUniqueBasketList, removeProductFromBasket, removeProductFromUniqueList, setProductToRemove, resetProductToRemove, setAddItemSuccessModalStatus, setBasketRemoveModalStatus, setCoupon, resetCouponStatus, resetOrder, resetOrderStatus } = productData.actions;
