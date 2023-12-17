import { useAppSelector } from '../../hooks';
import { BasketProduct } from '../basket-product/basket-product';
import { getUniqueBasketProducts } from '../../store/product-data/product-data.selectors';
//import { ProductType } from '../../types/product-type';

function BasketList () {

  //const selectedProducts = useAppSelector(getSelectedProducts);
  const uniqueProducts = useAppSelector(getUniqueBasketProducts);

  if (!uniqueProducts.length) {
    return null;
  }

  /*const selectedIds = selectedProducts.map((selectedProduct) => selectedProduct.id);
  const uniqueIds = new Set(selectedIds);

  const uniqueProducts: ProductType[] = [];
  uniqueIds.forEach((id) => {
    const uniqueProduct: ProductType | undefined = selectedProducts.find((product) => product.id === id);
    if (uniqueProduct) {
      uniqueProducts.push(uniqueProduct);
    }
  });*/
  //const uniqueProducts = selectedProducts.slice();
  /*if (!uniqueProducts.length) {
    return null;
  }*/
  //selectedIds.filter((id) => id === selectedProduct.id).length})
  /*const uniqueProductsWithQuantity = new Map();
  uniqueProducts.forEach((uniqueProduct) => uniqueProductsWithQuantity.set(uniqueProduct, selectedIds.slice().filter((selectedId) => selectedId === uniqueProduct.id).length));
  console.log(uniqueProductsWithQuantity);*/

  //const calculateQuantity = (ids: number[], product: ProductType) => ids.slice().filter((id) => id === product.id).length;

  /*const handleQuantityChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const quantity = evt.currentTarget.value;
  };*/

  return (
    <ul className="basket__list">
      {uniqueProducts.map ((product) => (
        <BasketProduct product={product} key={product.id}/>
      ))}
    </ul>
  );
}

export { BasketList };
