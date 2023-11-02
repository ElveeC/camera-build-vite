import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { ReviewSuccessModal } from './review-success-modal';
import { makeFakeReviews } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: ReviewSuccessModal', () => {

  const reviews = makeFakeReviews();

  it('should render correctly with setReviewPostingStatus = Status.Success', () => {

    const expectedModalTitleText = 'Спасибо за отзыв';
    const backToCatalogElement = 'backToCatalogElement';
    const closeButtoElement = 'closeButtoElement';

    const {withStoreComponent} = withStore(
      <ReviewSuccessModal/>, {
        REVIEWS:
        {
          reviews: reviews,
          areReviewsLoading: false,
          setReviewPostingStatus: Status.Success,
          isAddReviewModalActive: false
        }
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedModalTitleText)).toBeInTheDocument();
    expect(screen.getByTestId(backToCatalogElement)).toBeInTheDocument();
    expect(screen.getByTestId(closeButtoElement)).toBeInTheDocument();
  });
});
