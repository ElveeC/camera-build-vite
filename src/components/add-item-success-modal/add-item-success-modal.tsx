import { useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setAddItemSuccessModalStatus } from '../../store/product-data/product-data';
import { getAddItemSuccessModalStatus } from '../../store/product-data/product-data.selectors';

import { AppRoute } from '../../const';

function AddItemSuccessModal () {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isModalActive = useAppSelector(getAddItemSuccessModalStatus);
  const focusRef = useRef<HTMLDivElement | null>(null);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(setAddItemSuccessModalStatus(false));
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(setAddItemSuccessModalStatus(false));
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(setAddItemSuccessModalStatus(false));
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleCatalogButtonClick = () => {
    dispatch(setAddItemSuccessModalStatus(false));
  };

  const handleBasketButtonClick = () => {
    dispatch(setAddItemSuccessModalStatus(false));
    navigate(AppRoute.Basket);
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
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              <Link className="btn btn--transparent modal__btn" onClick={handleCatalogButtonClick} to={AppRoute.Catalog}>Продолжить покупки</Link>
              <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleBasketButtonClick}>Перейти в корзину</button>
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

export { AddItemSuccessModal };
