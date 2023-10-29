import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { NameSpace } from '../../const';
import { fetchReviewsAction, addReviewAction } from '../api-actions';
import { ReviewsDataType } from '../../types/state';
import { Status } from '../../const';

const initialState: ReviewsDataType = {
  reviews: [],
  areReviewsLoading: false,
  setReviewPostingStatus: Status.Unsent,
  isAddReviewModalActive: false
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    resetReviewPostingingStatus: (state) => {
      state.setReviewPostingStatus = Status.Unsent;
    },

    setAddReviewActive: (state, action: PayloadAction<boolean>) => {
      state.isAddReviewModalActive = action.payload;
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

export const { resetReviewPostingingStatus, setAddReviewActive } = reviewsData.actions;
