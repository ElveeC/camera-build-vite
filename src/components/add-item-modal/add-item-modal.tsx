import { useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSelectedProduct } from '../../store/product-data/product-data.selectors';
import { resetSelectedProduct } from '../../store/product-data/product-data';

function AddItemModal () {

  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(getSelectedProduct);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleEscapeKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(resetSelectedProduct());
      document.body.style.overflow = 'unset';
    }
  };

  const handleCloseButtonClick = () => {
    dispatch(resetSelectedProduct());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  const handleOverlayClick = () => {
    dispatch(resetSelectedProduct());
    document.body.style.overflow = 'unset';
    document.removeEventListener('keydown', handleEscapeKeydown);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (selectedProduct && buttonRef.current) {
        buttonRef.current.focus();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [selectedProduct]);

  if (!selectedProduct) {
    return null;
  }

  const {
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    vendorCode,
    type,
    level,
    price
  } = selectedProduct;

  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEscapeKeydown);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
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
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type}</li>
                <li className="basket-item__list-item">{level}</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" data-testid="basketButtonElement" ref={buttonRef}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export { AddItemModal };
