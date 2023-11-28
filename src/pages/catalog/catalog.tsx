//import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
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
import { getProducts, getProductsLoadingStatus, getSortByPopularityStatus, getSortByPriceStatus, getMinToMaxSortStatus/*, getPhotoCheckedStatus, getVideoCheckedStatus*/ } from '../../store/product-data/product-data.selectors';
import { getPromoLoadingStatus } from '../../store/promo-data/promo-data.selectors';

//import { getCurrentPageNumber } from '../../store/product-data/product-data.selectors';

import { CARDS_PER_PAGE_NUMBER, AppRoute, PAGE_RADIX, CategoryFilter, CategoryName } from '../../const';
import { sortByPriceMaxtoMin, sortByPriceMintoMax, sortLessPopularFirst, sortMostPopularFirst } from '../../utils';
//import { ProductType } from '../../types/product-type';


function Catalog () {
  //const { page } = useParams();

  //const currentPage = page ? parseInt(page, PAGE_RADIX) : 1;
  //const currentPage = useAppSelector(getCurrentPageNumber);
  const[searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const category = searchParams.get('category');
  const types = searchParams.getAll('type');
  const levels = searchParams.getAll('level');

  const currentPage = page ? parseInt(page, PAGE_RADIX) : 1;

  const products = useAppSelector(getProducts);
  const areProductsLoading = useAppSelector(getProductsLoadingStatus);
  const arePromoProductsLoading = useAppSelector(getPromoLoadingStatus);
  const isPriceChecked = useAppSelector(getSortByPriceStatus);
  const isPopularChecked = useAppSelector(getSortByPopularityStatus);
  const isMinToMax = useAppSelector(getMinToMaxSortStatus);
  //const isPhotoChecked = useAppSelector(getPhotoCheckedStatus);
  //const isVideoChecked = useAppSelector(getVideoCheckedStatus);

  if (areProductsLoading || arePromoProductsLoading) {
    return (
      <LoadingPage />
    );
  }
  let sortedProducts = products.slice();
  let filteredProducts;

  if (isPriceChecked) {
    switch (isMinToMax) {
      case true:
        sortedProducts = sortByPriceMintoMax(sortedProducts);
        break;
      default:
        sortedProducts = sortByPriceMaxtoMin(sortedProducts);
    }
  }

  if (isPopularChecked) {
    switch (isMinToMax) {
      case true:
        sortedProducts = sortLessPopularFirst(sortedProducts);
        break;
      default:
        sortedProducts = sortMostPopularFirst(sortedProducts);
    }
  }

  switch (category) {
    case CategoryName.Video:
      filteredProducts = sortedProducts.filter((product) => product.category === CategoryFilter.Video);
      break;
    case CategoryName.Photo:
      filteredProducts = sortedProducts.filter((product) => product.category === CategoryFilter.Photo);
      break;
    default:
      filteredProducts = sortedProducts;
  }

  if (types.length) {
    filteredProducts = filteredProducts.filter((product) => types.includes(product.type));
  }

  if (levels.length) {
    filteredProducts = filteredProducts.filter((product) => levels.includes(product.level));
  }

  const productsToShow = filteredProducts.slice((currentPage - 1) * CARDS_PER_PAGE_NUMBER, currentPage * CARDS_PER_PAGE_NUMBER);

  const pageCount = Math.ceil(filteredProducts.length / CARDS_PER_PAGE_NUMBER);

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
