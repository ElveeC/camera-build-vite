import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch } from '../../hooks';
import { setSelectedProduct } from '../../store/data-process/data-process';

import { Rating } from '../rating/rating';
import { AppRoute } from '../../const';
import { ProductType } from '../../types/product-type';

type ProductCardProps = {
 product: ProductType;
 isSimilar: boolean;
}

function ProductCard ({ product, isSimilar }: ProductCardProps) {
  const {
    id,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    rating,
    reviewCount,
    price
  } = product;

  const dispatch = useAppDispatch();

  const handleBuyButtonClick = () => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div className={cn(
      'product-card',
      { 'is-active': isSimilar}
    )}
    >
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`} />
          <img src={`../../${previewImg}`} srcSet={`../../${previewImg2x} 2x`} width="280" height="240" alt={`${name}.`} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={rating}/>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleBuyButtonClick}>Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export { ProductCard };
