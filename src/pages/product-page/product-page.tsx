import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { SimilarProductsSlider } from '../../components/similar-products-slider/similar-products-slider';
import { ProductTabs } from '../../components/product-tabs/product-tabs';
import { Reviews } from '../../components/reviews/reviews';
import { AddItemModal } from '../../components/add-item-modal/add-item-modal';

import { LoadingPage } from '../loading-page/loading-page';
import { NotFoundPage } from '../not-found-page/not-found-page';

import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductAction } from '../../store/api-actions';
import { getProduct, getProductLoadingStatus } from '../../store/data-process/data-process-selectors';

function ProductPage () {

  const currentProduct = useParams();
  const selectedProduct = useAppSelector(getProduct);
  const isProductLoading = useAppSelector(getProductLoadingStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentProduct.id) {
      dispatch(fetchProductAction(currentProduct.id));
    }
  }, [dispatch, currentProduct.id]);

  if (isProductLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!selectedProduct) {
    return <NotFoundPage />;
  }

  const {
    id,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    rating,
    reviewCount,
    price,
  } = selectedProduct;

  const handleUpButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera shop. Информация о продукте</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs currentPage={AppRoute.Product} productName={name}/>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`} />
                    <img src={`../../${previewImg}`} srcSet={`../../${previewImg2x} 2x`} width="560" height="480" alt={`${name}.`} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <ProductTabs product={selectedProduct} />
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <SimilarProductsSlider id={id}/>
          </div>
          <div className="page-content__section">
            <Reviews cameraId={id}/>
          </div>
        </div>
        <AddItemModal />
      </main>
      <Link className="up-btn" to="#header" onClick={handleUpButtonClick}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </Link>
      <Footer />
    </div>
  );
}

export { ProductPage };
