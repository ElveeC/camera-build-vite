import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { ProductList } from '../../components/product-list/product-list';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Banner } from '../../components/banner/banner';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Filter } from '../../components/filter/filter';
import { Sorting } from '../../components/sorting/sorting';
import { Pagination } from '../../components/pagination/pagination';
import { AddItemModal } from '../../components/add-item-modal/add-item-modal';

import { LoadingPage } from '../loading-page/loading-page';
import { NotFoundPage } from '../not-found-page/not-found-page';

import { useAppSelector } from '../../hooks';
import { getProducts, getProductsLoadingStatus } from '../../store/product-data/product-data.selectors';
import { getPromoLoadingStatus } from '../../store/promo-data/promo-data.selectors';

import { CARDS_PER_PAGE_NUMBER, AppRoute, PAGE_RADIX } from '../../const';


function Catalog () {
  const { page } = useParams();

  const currentPage = page ? parseInt(page, PAGE_RADIX) : 1;

  const products = useAppSelector(getProducts);
  const areProductsLoading = useAppSelector(getProductsLoadingStatus);
  const arePromoProductsLoading = useAppSelector(getPromoLoadingStatus);

  if (areProductsLoading || arePromoProductsLoading) {
    return (
      <LoadingPage />
    );
  }
  const productsToShow = products.slice((currentPage - 1) * CARDS_PER_PAGE_NUMBER, currentPage * CARDS_PER_PAGE_NUMBER);

  const pageCount = Math.ceil(products.length / CARDS_PER_PAGE_NUMBER);

  if (currentPage > pageCount) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera shop. Каталог</title>
      </Helmet>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs currentPage={AppRoute.Catalog}/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <Filter />
                </div>
                <div className="catalog__content">
                  <Sorting />
                  <ProductList products={productsToShow}/>
                  <Pagination currentPage={currentPage} pageCount={pageCount}/>
                </div>
              </div>
            </div>
          </section>
        </div>
        <AddItemModal />

      </main>
      <Footer />
    </div>
  );
}
export { Catalog };
