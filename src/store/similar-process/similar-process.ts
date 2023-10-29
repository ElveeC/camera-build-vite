import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchSimilarProductsAction } from '../api-actions';
import { SimilarProcessType } from '../../types/state';

const initialState: SimilarProcessType = {
  similarProducts: [],
  areSimilarProductsLoading: false,
};

export const similarProcess = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder

      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.areSimilarProductsLoading = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.areSimilarProductsLoading = false;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.areSimilarProductsLoading = false;
      });
  }
});
