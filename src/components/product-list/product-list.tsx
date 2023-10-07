import { ProductCard } from '../product-card/product-card';
import { ProductCardType } from '../../types/product-card-type';

type ProductListProps = {
  products: ProductCardType[];
}

function ProductList ({ products }: ProductListProps) {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard key={product.id} productCard={product}/>
      ))}
    </div>

  );
}

export { ProductList };
