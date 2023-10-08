import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchProductsAction } from '../api-actions';
import { DataProcessType } from '../../types/state';

const initialState: DataProcessType = {
  products: [],
  areProductsLoading: false
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(fetchProductsAction.pending, (state) => {
        state.areProductsLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.areProductsLoading = false;
      });
  }
});
