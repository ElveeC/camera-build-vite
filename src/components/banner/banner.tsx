import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { AppRoute, BannerSliderData } from '../../const';
import 'swiper/css/bundle';
import './banner.css';

import { useAppSelector } from '../../hooks';
import { getPromoProducts } from '../../store/promo-data/promo-data.selectors';

function Banner () {

  const promoProducts = useAppSelector(getPromoProducts);

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: BannerSliderData.AutoPlayDelay,
        disableOnInteraction: false
      }}
      slidesPerView={BannerSliderData.SlidesPerView}
      speed={BannerSliderData.Speed}
      loop
      pagination={{
        clickable: true,
        renderBullet: function (_, className: string) {
          return `<span class="${ className }"></span>`;
        }
      }}

    >
      {promoProducts.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="banner">
            <picture>
              <source type="image/webp" srcSet={`../../${product.previewImgWebp}, ../../${product.previewImgWebp2x} 2x`} />
              <img src={`../../${product.previewImg}`} srcSet={`../../${product.previewImg2x} 2x`} width="1280" height="280" alt={`${product.name}.`} />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{product.name}</span>
              <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
              <Link className="btn" to={`${AppRoute.Product}/${product.id}`}>Подробнее</Link>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export { Banner };
