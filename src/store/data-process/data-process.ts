import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchProductsAction, fetchProductAction } from '../api-actions';
import { DataProcessType } from '../../types/state';
import { ProductType } from '../../types/product-type';

const initialState: DataProcessType = {
  products: [],
  areProductsLoading: false,
  product: null,
  isProductLoading: false,
  selectedProduct: null,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<ProductType>) => {
      state.selectedProduct = action.payload;
    },

    resetSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchProductsAction.pending, (state) => {
        state.areProductsLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.areProductsLoading = false;
      })

      .addCase(fetchProductAction.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductLoading = false;
      });
  }
});

export const { setSelectedProduct, resetSelectedProduct } = dataProcess.actions;
