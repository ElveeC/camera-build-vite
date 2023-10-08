import { ProductCard } from '../product-card/product-card';
import { ProductType } from '../../types/product-type';

type ProductListProps = {
  products: ProductType[];
}

function ProductList ({ products }: ProductListProps) {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>

  );
}

export { ProductList };
