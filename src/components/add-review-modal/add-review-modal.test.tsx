import { render, screen } from '@testing-library/react';
import { AddReviewModal } from './add-review-modal';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeProduct } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: AddReviewModal', () => {
  const mockProduct = makeFakeProduct();
  const {
    id
  } = mockProduct;
  it('should render correctly', () => {
    const expectedModalTitleText = 'Оставить отзыв';
    const expectedRatingText = 'Рейтинг';
    const starElementTestId = 'starElement';
    const expectedUserNameText = 'Ваше имя';
    const expectedUserNamePlaceholderText = 'Введите ваше имя';
    const expectedAdvantageText = 'Достоинства';
    const expectedAdvantagePlaceholderText = 'Основные преимущества товара';
    const expectedDisadvantageText = 'Недостатки';
    const expectedDisadvantagePlaceholderText = 'Главные недостатки товара';
    const expectedCommentText = 'Комментарий';
    const expectedCommentPlaceholderText = 'Поделитесь своим опытом покупки';
    const expectedSubmitTestId = 'submitElement';
    const expectedSubmitText = 'Отправить отзыв';
    const expectedCloseText = 'Закрыть попап';

    const { withStoreComponent } = withStore(<AddReviewModal cameraId={id} />, {
      REVIEWS: {
        reviews: [],
        areReviewsLoading: false,
        setReviewPostingStatus: Status.Unsent,
        isAddReviewModalActive: true
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedModalTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedRatingText)).toBeInTheDocument();
    expect(screen.getAllByTestId(starElementTestId).length).toBe(5);
    expect(screen.getByText(expectedUserNameText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedUserNamePlaceholderText)).toBeInTheDocument();
    expect(screen.getByText(expectedAdvantageText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedAdvantagePlaceholderText)).toBeInTheDocument();
    expect(screen.getByText(expectedDisadvantageText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedDisadvantagePlaceholderText)).toBeInTheDocument();
    expect(screen.getByText(expectedCommentText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedCommentPlaceholderText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedSubmitTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedSubmitText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedCloseText)).toBeInTheDocument();
  });

});
