import { useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import './similar-products-slider.css';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSimilarProducts, getSimilarProductsLoadingStatus } from '../../store/similar-data/similar-data.selectors';
import { fetchSimilarProductsAction } from '../../store/api-actions';

import { ProductCard } from '../product-card/product-card';

import { SimilarProductsSliderData } from '../../const';

type SimilarProductsSliderProps = {
  id: number;
}

function SimilarProductsSlider ({ id }: SimilarProductsSliderProps) {
  const dispatch = useAppDispatch();
  const similarProducts = useAppSelector(getSimilarProducts);
  const areSimilarProductsLoading = useAppSelector(getSimilarProductsLoadingStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchSimilarProductsAction(id));
    }
  }, [dispatch, id]);

  if (areSimilarProductsLoading) {
    return '';
  }

  if (!similarProducts.length) {
    return '';
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">

          <Swiper
            className="product-similar__slider-list"
            navigation = {{
              nextEl: '.slider-controls--next',
              prevEl: '.slider-controls--prev',
            }}

            modules={[Navigation]}

            slidesPerView={SimilarProductsSliderData.SlidesPerView}
            slidesPerGroup={SimilarProductsSliderData.SlidesPerGroup}
            spaceBetween={SimilarProductsSliderData.SpaceBetween}
            speed={SimilarProductsSliderData.Speed}
          >

            {similarProducts.map((similarProduct) => (
              <SwiperSlide key={similarProduct.id}>
                <ProductCard key={similarProduct.id} product={similarProduct} isSimilar/>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="slider-controls slider-controls--prev" type="button" style={{pointerEvents: 'auto'}} aria-label="Предыдущий слайд" disabled>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" style={{pointerEvents: 'auto'}} aria-label="Следующий слайд">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export { SimilarProductsSlider };
