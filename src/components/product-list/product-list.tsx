import { ProductCard } from '../product-card/product-card';
import { ProductType } from '../../types/product-type';

type ProductListProps = {
  products: ProductType[];
}

function ProductList ({ products }: ProductListProps) {

  return (
    <div className="cards catalog__cards" data-testid="productListElement">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isSimilar={false} />
      ))}
    </div>

  );
}

export { ProductList };
