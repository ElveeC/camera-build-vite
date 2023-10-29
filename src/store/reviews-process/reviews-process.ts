import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { NameSpace } from '../../const';
import { fetchReviewsAction, addReviewAction } from '../api-actions';
import { ReviewsProcessType } from '../../types/state';
import { Status } from '../../const';

const initialState: ReviewsProcessType = {
  reviews: [],
  areReviewsLoading: false,
  setReviewPostingStatus: Status.Unsent,
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    resetReviewPostingingStatus: (state) => {
      state.setReviewPostingStatus = Status.Unsent;
    },
  },

  extraReducers(builder) {
    builder

      .addCase(fetchReviewsAction.pending, (state) => {
        state.areReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.areReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.areReviewsLoading = false;
      })

      .addCase(addReviewAction.pending, (state) => {
        state.setReviewPostingStatus = Status.Pending;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.setReviewPostingStatus = Status.Success;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.setReviewPostingStatus = Status.Error;
        toast.warn('Не удалось отправить отзыв');
      });
  }
});

export const { resetReviewPostingingStatus } = reviewsProcess.actions;
