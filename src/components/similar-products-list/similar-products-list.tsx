import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSimilarProducts, getSimilarProductsLoadingStatus } from '../../store/similar-process/similar-process-selectors';
import { fetchSimilarProductsAction } from '../../store/api-actions';
import { LoadingPage } from '../../pages/loading-page/loading-page';
import { SimilarProductCard } from '../similar-product-card/similar-product-card';

type SimilarProductsProps = {
  id: number;
}

function SimilarProductsList ({ id }: SimilarProductsProps) {
  const dispatch = useAppDispatch();
  const similarProducts = useAppSelector(getSimilarProducts);
  const areSimilarProductsLoading = useAppSelector(getSimilarProductsLoadingStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchSimilarProductsAction(id));
    }
  }, [dispatch, id]);

  if (areSimilarProductsLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!similarProducts) {
    return '';
  }
  const similarProductsToShow = similarProducts.slice(0, 3);

  /*{similarProductsToShow.map((similarProduct) => {
    <ProductCard />
  })}*/
  return (
    <div className="product-similar__slider-list">
      {similarProductsToShow.map((similarProduct) => (
        <SimilarProductCard key={similarProduct.id}similarProduct={similarProduct}/>
      ))}
    </div>
  );
}

export { SimilarProductsList };
