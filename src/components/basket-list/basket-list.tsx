import { useAppSelector } from '../../hooks';
import { BasketProduct } from '../basket-product/basket-product';
import { getUniqueBasketProducts } from '../../store/product-data/product-data.selectors';

function BasketList () {

  const uniqueProducts = useAppSelector(getUniqueBasketProducts);

  if (!uniqueProducts.length) {
    return null;
  }

  return (
    <ul className="basket__list">
      {uniqueProducts.map ((product) => (
        <BasketProduct product={product} key={product.id}/>
      ))}
    </ul>
  );
}

export { BasketList };
