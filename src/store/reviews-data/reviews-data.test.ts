import { addReviewAction, fetchReviewsAction } from '../api-actions';
import { resetReviewPostingingStatus, reviewsData, setAddReviewActive } from './reviews-data';
import { makeFakeReview, makeFakeReviews } from '../../mocks/mocks';
import { Status } from '../../const';

describe('ReviewData Slice', () => {
  const initialState = {
    reviews: [],
    areReviewsLoading: false,
    setReviewPostingStatus: Status.Unsent,
    isAddReviewModalActive: false
  };
  describe('fetchReviewsAction', () => {
    it('should return the initial state with an empty action', () => {
      const emptyAction = { type: ''};
      const expectedState = {...initialState};

      const result = reviewsData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return the default initial state with an empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {...initialState};

      const result = reviewsData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set "areReviewsLoading" to "true" with "fetchReviewsAction.pending"', () => {
      const expectedState = {
        ...initialState,
        areReviewsLoading: true,
      };

      const result = reviewsData.reducer(undefined, fetchReviewsAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "reviews" to an array with reviews, "areReviewsLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
      const mockReviews = makeFakeReviews();
      const expectedState = {
        ...initialState,
        reviews: mockReviews,
        areReviewsLoading: false
      };

      const result = reviewsData.reducer({...initialState}, {type: fetchReviewsAction.fulfilled.type, payload: mockReviews});

      expect(result).toEqual(expectedState);
    });

    it('should set "areReviewsLoading" to "false" with "fetchReviewsAction.rejected', () => {
      const expectedState = {
        ...initialState,
        areReviewsLoading: false
      };

      const result = reviewsData.reducer(
        undefined,
        fetchReviewsAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('addReviewAction', () => {
    it('should set "setReviewPostingStatus" to "Status.Pending" with "addReviewAction.pending"', () => {
      const expectedState = {
        ...initialState,
        setReviewPostingStatus: Status.Pending,
      };

      const result = reviewsData.reducer(undefined, addReviewAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should add the new review to reviews, "setReviewPostingStatus" to "Status.Success" with "addReviewAction.fulfilled"', () => {
      const mockReviews = makeFakeReviews();
      const mockReview = makeFakeReview();
      const updatedReviews = [...mockReviews, mockReview];

      const initialReviewsState = {
        ...initialState,
        reviews: mockReviews,
      };

      const expectedState = {
        ...initialState,
        reviews: updatedReviews,
        setReviewPostingStatus: Status.Success
      };

      const result = reviewsData.reducer({...initialReviewsState}, {type: addReviewAction.fulfilled.type, payload: mockReview});

      expect(result).toEqual(expectedState);
    });

    it('should set "setReviewPostingStatus" to "Status.Error" with "addReviewAction.rejected', () => {
      const mockReviews = makeFakeReviews();
      const initialReviewsState = {
        ...initialState,
        reviews: mockReviews,
      };
      const expectedState = {
        ...initialReviewsState,
        setReviewPostingStatus: Status.Error
      };

      const result = reviewsData.reducer(
        {...initialReviewsState},
        addReviewAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  it('should reset "setReviewPostingStatus" to "Status.Unsent"', () => {
    const newInitialReviewPostingStatus = Status.Success;
    const initialStateWithPostedReview = {
      ...initialState,
      setReviewPostingStatus: newInitialReviewPostingStatus
    };
    const expectedState = {...initialState};

    const result = reviewsData.reducer({...initialStateWithPostedReview}, {type: resetReviewPostingingStatus, setReviewPostingStatus: Status.Unsent});

    expect(result).toEqual(expectedState);
  });

  it('should change the add review modal status to true', () => {

    const expectedState = {
      ...initialState,
      isAddReviewModalActive: true,
    };

    const result = reviewsData.reducer({...initialState}, {type: setAddReviewActive, payload: true});

    expect(result).toEqual(expectedState);
  });

  it('should change the add review modal status from true to false', () => {
    const newInitialState = {
      ...initialState,
      isAddReviewModalActive: true,
    };

    const expectedState = {
      ...initialState
    };

    const result = reviewsData.reducer({...newInitialState}, {type: setAddReviewActive, payload: false});

    expect(result).toEqual(expectedState);
  });
});
