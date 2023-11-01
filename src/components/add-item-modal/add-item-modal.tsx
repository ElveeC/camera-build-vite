import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSelectedProduct } from '../../store/product-data/product-data.selectors';
import { resetSelectedProduct } from '../../store/product-data/product-data';

function AddItemModal () {

  const dispatch = useAppDispatch();

  const selectedProduct = useAppSelector(getSelectedProduct);

  if (!selectedProduct) {
    return '';
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

  const handleCloseButtonClick = () => {
    dispatch(resetSelectedProduct());

  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
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
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" data-testid="basketButtonElement">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick} data-testid="closeButtonElement">
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
