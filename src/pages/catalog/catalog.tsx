import { Helmet } from 'react-helmet-async';
import { ProductList } from '../../components/product-list/product-list';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Banner } from '../../components/banner/banner';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Filter } from '../../components/filter/filter';
import { Sorting } from '../../components/sorting/sorting';
import { Pagination } from '../../components/pagination/pagination';
import { LoadingPage } from '../loading-page/loading-page';
import { useAppSelector } from '../../hooks';
import { getProducts, getProductsLoadingStatus } from '../../store/data-process/data-process-selectors';
//import { products } from '../../mocks/product-mocks';

function Catalog () {

  //const products = useAppSelector((state) => state.products);
  //const areProductsLoading = useAppSelector((state) => state.areProductsLoading);
  const products = useAppSelector(getProducts);
  const areProductsLoading = useAppSelector(getProductsLoadingStatus);

  if (areProductsLoading) {
    return (
      <LoadingPage />
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
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <Filter />
                </div>
                <div className="catalog__content">
                  <Sorting />
                  <ProductList products={products}/>
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export { Catalog };
