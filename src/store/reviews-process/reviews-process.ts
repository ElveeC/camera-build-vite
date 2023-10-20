import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchReviewsAction } from '../api-actions';
import { ReviewsProcessType } from '../../types/state';

const initialState: ReviewsProcessType = {
  reviews: [],
  areReviewsLoading: false,
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder

      .addCase(fetchReviewsAction.pending, (state) => {
        state.areReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.areReviewsLoading = false;
      });
  }
});
