import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, LocalStorage } from '../../const';
import { fetchProductsAction, fetchProductAction } from '../api-actions';
import { ProductDataType } from '../../types/state';
import { ProductType } from '../../types/product-type';

const initialState: ProductDataType = {
  products: [],
  areProductsLoading: false,
  product: null,
  isProductLoading: false,
  selectedProduct: null,
  selectedProducts: JSON.parse(localStorage.getItem(LocalStorage.SelectedProducts) || '[]') as ProductType[],
  uniqueBasketProducts:JSON.parse(localStorage.getItem(LocalStorage.UniqueBasketProducts) || '[]') as ProductType[],
  hasError: false,
  isAddItemSuccessModalActive: false,
  isBasketRemoveModalActive: false,
  productToRemove: null,
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
      });
  }
});

export const { setSelectedProduct, resetSelectedProduct, addProductToBasket, addToUniqueBasketList, removeProductFromBasket, removeProductFromUniqueList, setProductToRemove, resetProductToRemove, setAddItemSuccessModalStatus, setBasketRemoveModalStatus } = productData.actions;
