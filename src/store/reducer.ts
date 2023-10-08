import { createReducer } from '@reduxjs/toolkit';
import { loadProducts, setProductsDataLoadingStatus } from './action';
import { ProductType } from '../types/product-type';

//import { products } from '../mocks/product-mocks';

type InitialState = {
  products: ProductType[];
  areProductsLoading: boolean;
}
const initialState: InitialState = {
  products: [],
  areProductsLoading: false
};

const reducer = createReducer(initialState, (builder) => {
  builder

    .addCase(loadProducts, (state, action) => {
      state.products = action.payload;
    })

    .addCase(setProductsDataLoadingStatus, (state, action) => {
      state.areProductsLoading = action.payload;
    });
});

export { reducer };
