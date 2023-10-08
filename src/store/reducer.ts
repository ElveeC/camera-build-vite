import { createReducer } from '@reduxjs/toolkit';
import { loadProducts } from './action';

import { products } from '../mocks/product-mocks';

const initialState = {
  products: products,
};

const reducer = createReducer(initialState, (builder) => {
  builder

    .addCase(loadProducts, (state, action) => {
      state.products = action.payload;
    });
});

export { reducer };

