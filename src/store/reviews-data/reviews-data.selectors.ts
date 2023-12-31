import { NameSpace, Status } from '../../const';
import { State } from '../../types/state';
import { ReviewType } from '../../types/review-type';

export const getReviews = (state: State): ReviewType[] => state[NameSpace.Reviews].reviews;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Reviews].areReviewsLoading;
export const getReviewPostingStatus = (state: State): Status => state[NameSpace.Reviews].setReviewPostingStatus;

export const getAddReviewActiveStatus = (state: State): boolean => state[NameSpace.Reviews].isAddReviewModalActive;
