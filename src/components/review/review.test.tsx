import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { Review } from './review';
import { makeFakeReview } from '../../mocks/mocks';

describe('Component: Review', () => {

  const reviewItem = makeFakeReview();

  it('should render correctly with isSimilar=false', () => {
    const { userName, advantage, disadvantage, review } = reviewItem;

    const expectedUserNameText = `${userName}`;
    const dateElement = 'dateElement';
    const expectedAdvantageTitleText = 'Достоинства:';
    const expectedAdvantageText = `${advantage}`;
    const expectedDisadvantageTitleText = 'Недостатки:';
    const expectedDisadvantageText = `${disadvantage}`;
    const expectedReviewTitleText = 'Комментарий:';
    const expectedReviewText = `${review}`;

    const {withStoreComponent} = withStore(
      <Review reviewItem={reviewItem} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedUserNameText)).toBeInTheDocument();
    expect(screen.getByTestId(dateElement)).toBeInTheDocument();
    expect(screen.getByText(expectedAdvantageTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedAdvantageText)).toBeInTheDocument();
    expect(screen.getByText(expectedDisadvantageTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedDisadvantageText)).toBeInTheDocument();
    expect(screen.getByText(expectedReviewTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedReviewText)).toBeInTheDocument();
  });
});
