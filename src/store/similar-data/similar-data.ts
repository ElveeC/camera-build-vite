import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchSimilarProductsAction } from '../api-actions';
import { SimilarDataType } from '../../types/state';

const initialState: SimilarDataType = {
  similarProducts: [],
  areSimilarProductsLoading: false,
};

export const similarData = createSlice({
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
