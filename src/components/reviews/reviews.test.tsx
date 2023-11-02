import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { Reviews } from './reviews';
import { makeFakeReviews } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: Reviews', () => {

  const reviews = makeFakeReviews();

  it('should render correctly with areReviewsLoading = false and reviews to show > rendered reviews', () => {

    const expectedReviewsTitleText = 'Отзывы';
    const expectedAddReviewText = 'Оставить свой отзыв';
    const expectedMoreButtonText = 'Показать больше отзывов';
    const addReviewElement = 'addReviewElement';
    const moreButtonElement = 'moreButtonElement';

    const {withStoreComponent} = withStore(
      <Reviews cameraId={reviews[0].cameraId}/>, {
        REVIEWS:
        {
          reviews: reviews,
          areReviewsLoading: false,
          setReviewPostingStatus: Status.Unsent,
          isAddReviewModalActive: false
        }
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedReviewsTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedAddReviewText)).toBeInTheDocument();
    expect(screen.getByText(expectedMoreButtonText)).toBeInTheDocument();
    expect(screen.getByTestId(addReviewElement)).toBeInTheDocument();
    expect(screen.getByTestId(moreButtonElement)).toBeInTheDocument();
  });

  it('should render correctly with areReviewsLoading = false and all reviews shown', () => {
    const allReviews = reviews.slice(0, 2);
    const expectedReviewsTitleText = 'Отзывы';
    const expectedAddReviewText = 'Оставить свой отзыв';
    const notExpectedMoreButtonText = 'Показать больше отзывов';
    const addReviewElement = 'addReviewElement';
    const notExpectedMoreButtonElement = 'moreButtonElement';

    const {withStoreComponent} = withStore(
      <Reviews cameraId={allReviews[0].cameraId}/>, {
        REVIEWS:
        {
          reviews: allReviews,
          areReviewsLoading: false,
          setReviewPostingStatus: Status.Unsent,
          isAddReviewModalActive: false
        }
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedReviewsTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedAddReviewText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedMoreButtonText)).not.toBeInTheDocument();
    expect(screen.getByTestId(addReviewElement)).toBeInTheDocument();
    expect(screen.queryByTestId(notExpectedMoreButtonElement)).not.toBeInTheDocument();
  });

  it('should not render with areReviewsLoading = true', () => {

    const notExpectedReviewsElement = 'reviewsElement';

    const {withStoreComponent} = withStore(
      <Reviews cameraId={reviews[0].cameraId}/>, {
        REVIEWS:
        {
          reviews: reviews,
          areReviewsLoading: true,
          setReviewPostingStatus: Status.Unsent,
          isAddReviewModalActive: false
        }
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.queryByTestId(notExpectedReviewsElement)).not.toBeInTheDocument();
  });

  it('should not render if there are no reviews', () => {

    const notExpectedReviewsElement = 'reviewsElement';

    const {withStoreComponent} = withStore(
      <Reviews cameraId={1}/>, {
        REVIEWS:
        {
          reviews: [],
          areReviewsLoading: false,
          setReviewPostingStatus: Status.Unsent,
          isAddReviewModalActive: false
        }
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.queryByTestId(notExpectedReviewsElement)).not.toBeInTheDocument();
  });
});
