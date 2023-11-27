import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchProductsAction, fetchProductAction } from '../api-actions';
import { ProductDataType } from '../../types/state';
import { ProductType } from '../../types/product-type';

const initialState: ProductDataType = {
  products: [],
  areProductsLoading: false,
  product: null,
  isProductLoading: false,
  selectedProduct: null,
  isPopularChecked: false,
  isPriceChecked: false,
  isMinToMax: false,
  isMaxToMin: false,
  isPhotoChecked: false,
  isVideoChecked: false,
  hasError: false,
  currentPageNumber: 1
};

export const productData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setCurrentPageNumber: (state, action: PayloadAction<number>) => {
      state.currentPageNumber = action.payload;
    },

    setSelectedProduct: (state, action: PayloadAction<ProductType>) => {
      state.selectedProduct = action.payload;
    },

    resetSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    setSortByPriceStatus: (state, action:PayloadAction<boolean>) => {
      state.isPriceChecked = action.payload;
    },

    setSortByPopularityStatus: (state, action:PayloadAction<boolean>) => {
      state.isPopularChecked = action.payload;
    },

    setMinToMaxSortStatus: (state, action:PayloadAction<boolean>) => {
      state.isMinToMax = action.payload;
    },

    setMaxToMinSortStatus: (state, action:PayloadAction<boolean>) => {
      state.isMaxToMin = action.payload;
    },

    setPhotoCheckedStatus: (state, action:PayloadAction<boolean>) => {
      state.isPhotoChecked = action.payload;
    },

    setVideoCheckedStatus: (state, action:PayloadAction<boolean>) => {
      state.isVideoChecked = action.payload;
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

export const { setCurrentPageNumber, setSelectedProduct, resetSelectedProduct, setSortByPriceStatus, setSortByPopularityStatus, setMaxToMinSortStatus, setMinToMaxSortStatus, setPhotoCheckedStatus, setVideoCheckedStatus } = productData.actions;
