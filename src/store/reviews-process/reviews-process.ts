import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchReviewsAction } from '../api-actions';
import { ReviewsProcessType } from '../../types/state';

const initialState: ReviewsProcessType = {
  reviews: [],
  areReviewsLoading: false,
  isReviewSuccessModalActive: false,
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    changeReviewSuccessModalStatus: (state) => {
      if (state.isReviewSuccessModalActive) {
        state.isReviewSuccessModalActive = false;
      } else {
        state.isReviewSuccessModalActive = true;
      }
    }
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

export const { changeReviewSuccessModalStatus } = reviewsProcess.actions;
