import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { resetOrderStatus } from '../../store/product-data/product-data';
import { getOrderPostingStatus } from '../../store/product-data/product-data.selectors';
import { Status, AppRoute} from '../../const';

function OrderSuccessModal () {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const focusRef = useRef<HTMLDivElement | null>(null);

  const orderStatus = useAppSelector(getOrderPostingStatus);
  const isModalActive = orderStatus === Status.Success;


  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(resetOrderStatus());
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(resetOrderStatus());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(resetOrderStatus());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleBackToCatalogClick = () => {
    dispatch(resetOrderStatus());
    navigate(AppRoute.Catalog);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (isModalActive && focusRef.current) {
        focusRef.current.focus();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKeydown);
      }

      return () => {
        document.removeEventListener('keydown', handleEscapeKeydown);
        document.body.style.overflow = 'unset';
      };
    }
    return () => {
      isMounted = false;
    };
  }, [isModalActive, handleEscapeKeydown]);


  return (
    <div
      className={cn(
        'modal',
        'modal--narrow',
        { 'is-active': isModalActive}
      )}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <FocusLock ref={focusRef} returnFocus>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleBackToCatalogClick}>Вернуться к покупкам
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </FocusLock>
      </div>
    </div>
  );
}

export { OrderSuccessModal };
