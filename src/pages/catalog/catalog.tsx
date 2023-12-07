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
import { NothingFoundMessage } from '../../components/nothing-found-message/nothing-found-message';

import { LoadingPage } from '../loading-page/loading-page';

import { useAppSelector } from '../../hooks';
import { getProducts, getProductsLoadingStatus } from '../../store/product-data/product-data.selectors';
import { getPromoLoadingStatus } from '../../store/promo-data/promo-data.selectors';


import { CARDS_PER_PAGE_NUMBER, AppRoute, PAGE_RADIX, CategoryFilter, CategoryName, FilterOption, SortOption, SortType, SortOrder } from '../../const';
import { sortByPriceMaxtoMin, sortByPriceMintoMax, sortLessPopularFirst, sortMostPopularFirst } from '../../utils';


function Catalog () {

  const[searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const category = searchParams.get(FilterOption.Category);
  const types = searchParams.getAll(FilterOption.Type);
  const levels = searchParams.getAll(FilterOption.Level);
  const priceMinParam = searchParams.get(FilterOption.PriceMin);
  const priceMaxParam = searchParams.get(FilterOption.PriceMax);
  const order = searchParams.get(SortType.Order);
  const sort = searchParams.get(SortType.Sort);

  const currentPage = page ? parseInt(page, PAGE_RADIX) : 1;

  const products = useAppSelector(getProducts);
  const areProductsLoading = useAppSelector(getProductsLoadingStatus);
  const arePromoProductsLoading = useAppSelector(getPromoLoadingStatus);
  const isPriceChecked = sort === SortOption.Price;
  const isPopularChecked = sort === SortOption.Popular;
  const isMinToMax = order === SortOrder.MinToMax;

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

  if (priceMaxParam) {
    filteredProducts = filteredProducts.filter((product) => product.price <= Number(priceMaxParam));
  }
  if (priceMinParam) {
    filteredProducts = filteredProducts.filter((product) => product.price >= Number(priceMinParam));
  }

  const prices = filteredProducts.map((product) => product.price);

  const minPrice = filteredProducts.length ? Math.min(...prices) : null;
  const maxPrice = filteredProducts.length ? Math.max(...prices) : null;

  const productsToShow = filteredProducts.slice((currentPage - 1) * CARDS_PER_PAGE_NUMBER, currentPage * CARDS_PER_PAGE_NUMBER);

  const pageCount = Math.ceil(filteredProducts.length / CARDS_PER_PAGE_NUMBER);

  const shoudNothingFoundMessageBeRendered = priceMinParam && priceMaxParam && Number(priceMinParam) <= Number(priceMaxParam) || !priceMinParam && priceMaxParam;

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
                  <Filter minPrice={minPrice} maxPrice={maxPrice}/>
                </div>
                <div className="catalog__content">
                  <Sorting />
                  {currentPage > pageCount && shoudNothingFoundMessageBeRendered && <NothingFoundMessage />}
                  {
                    currentPage <= pageCount &&
                    <ProductList products={productsToShow}/>
                  }
                  {
                    currentPage <= pageCount && pageCount > 1 &&
                    <Pagination currentPage={currentPage} pageCount={pageCount}/>
                  }
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
