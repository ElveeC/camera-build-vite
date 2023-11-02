import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviewPostingStatus } from '../../store/reviews-data/reviews-data.selectors';
import { resetReviewPostingingStatus } from '../../store/reviews-data/reviews-data';
import { Status } from '../../const';

function ReviewSuccessModal () {

  const dispatch = useAppDispatch();
  const reviewPostingStatus = useAppSelector(getReviewPostingStatus);
  const handleBackToProductButtonClick = () => {
    if (reviewPostingStatus === Status.Success) {
      dispatch(resetReviewPostingingStatus());
    }
  };

  const handleCloseButtonClick = () => {
    if (reviewPostingStatus === Status.Success) {
      dispatch(resetReviewPostingingStatus());

    }
  };

  return (
    <div
      className={cn(
        'modal',
        'modal--narrow',
        { 'is-active': reviewPostingStatus === Status.Success}
      )}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" data-testid="reviewSuccessElement">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleBackToProductButtonClick} type="button" data-testid="backToCatalogElement">Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick} data-testid="closeButtoElement">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export { ReviewSuccessModal };
