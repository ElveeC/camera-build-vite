import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSelectedProducts } from '../../store/product-data/product-data.selectors';
import { addProductToBasket, removeProductFromBasket, setBasketRemoveModalStatus, setProductToRemove } from '../../store/product-data/product-data';
import { ProductType } from '../../types/product-type';
import { ProductQuantity, REGEX_INVALID_QUANTITY } from '../../const';
import { formatPrice } from '../../utils';

type BasketProductProps = {
  product: ProductType;
}

function BasketProduct ({ product }: BasketProductProps) {

  const { id, name, category, level, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, vendorCode, price } = product;
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(getSelectedProducts);
  const productQuantity = selectedProducts.filter((selectedProduct) => selectedProduct.id === id).length;

  const [ quantity, setQuantity ] = useState(productQuantity);
  const productQuantityValue = quantity !== 0 ? quantity : ProductQuantity.MinQuantity;

  const handleQuantityChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let quantityValue = Number(evt.target.value.replace(REGEX_INVALID_QUANTITY, ''));

    if (Number(quantityValue) > ProductQuantity.MaxQuantity) {
      quantityValue = ProductQuantity.MaxQuantity;
    }
    setQuantity(quantityValue);

  };

  const handleQuantityBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let quantityValue = Number(evt.target.value);

    if (Number(quantityValue) < ProductQuantity.MinQuantity) {
      quantityValue = ProductQuantity.MinQuantity;
    }
    setQuantity(quantityValue);
    dispatch(removeProductFromBasket(id));
    for (let i = 1; i <= quantityValue; i++) {
      dispatch(addProductToBasket(product));
    }
  };

  const handleQuantityEnter = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      let quantityValue = Number(evt.currentTarget.value);

      if (Number(quantityValue) < ProductQuantity.MinQuantity) {
        quantityValue = ProductQuantity.MinQuantity;
      }
      setQuantity(quantityValue);
      dispatch(removeProductFromBasket(id));
      for (let i = 1; i <= quantityValue; i++) {
        dispatch(addProductToBasket(product));
      }
    }
  };

  const handlePlusButtonClick = () => {
    const newQuantity = productQuantity + 1;
    setQuantity(newQuantity);
    dispatch(addProductToBasket(product));
  };

  const handleMinusButtonClick = () => {
    const newQuantity = productQuantity - 1;
    setQuantity(newQuantity);
    dispatch(removeProductFromBasket(id));
    for (let i = 1; i <= newQuantity; i++) {
      dispatch(addProductToBasket(product));
    }
  };

  const handleRemoveButtonClick = () => {
    dispatch(setBasketRemoveModalStatus(true));
    dispatch(setProductToRemove(product));
  };

  return (
    <li className="basket-item">
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
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={handleMinusButtonClick} disabled={quantity <= ProductQuantity.MinQuantity}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="string" id="counter1" onBlur={handleQuantityBlur} onKeyDown={handleQuantityEnter} onChange={handleQuantityChange} value={quantity} min="1" max="99" aria-label="количество товара" />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={handlePlusButtonClick} disabled={quantity >= ProductQuantity.MaxQuantity}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{formatPrice(price * productQuantityValue)} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleRemoveButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export { BasketProduct };
