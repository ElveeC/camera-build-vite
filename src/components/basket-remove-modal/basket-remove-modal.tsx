import { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getBasketRemoveModalStatus, getProductToRemove } from '../../store/product-data/product-data.selectors';
import { resetProductToRemove, removeProductFromBasket, removeProductFromUniqueList, setBasketRemoveModalStatus } from '../../store/product-data/product-data';
import { AppRoute } from '../../const';

function BasketRemoveModal () {

  const isModalActive = useAppSelector(getBasketRemoveModalStatus);
  const productToRemove = useAppSelector(getProductToRemove);

  const focusRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(setBasketRemoveModalStatus(false));
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(setBasketRemoveModalStatus(false));
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(setBasketRemoveModalStatus(false));
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
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

  if (!productToRemove) {
    return null;
  }

  const { id, name, level, type, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, vendorCode } = productToRemove;

  const handleRemoveButtonClick = () => {
    dispatch(removeProductFromBasket(id));
    dispatch(removeProductFromUniqueList(id));
    dispatch(resetProductToRemove());
    dispatch(setBasketRemoveModalStatus(false));
  };

  const handleCatalogButtonClick = () => {
    dispatch(resetProductToRemove());
    dispatch(setBasketRemoveModalStatus(false));
  };


  return (
    <div
      className={cn(
        'modal',
        { 'is-active': isModalActive}
      )}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <FocusLock ref={focusRef} returnFocus>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`} />
                  <img src={`../../${previewImg}`} srcSet={`../../${previewImg2x} 2x`} width="140" height="120" alt={`${name}.`} />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{type} камера</li>
                  <li className="basket-item__list-item">{level} уровень</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleRemoveButtonClick}>Удалить
              </button>
              <Link className="btn btn--transparent modal__btn modal__btn--half-width" onClick={handleCatalogButtonClick} to={AppRoute.Catalog}>Продолжить покупки
              </Link>
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

export { BasketRemoveModal };
