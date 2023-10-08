import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Banner } from '../../components/banner/banner';
import { AppRoute } from '../../const';

function NotFoundPage () {

  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera shop. Страница не найдена</title>
      </Helmet>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Мы не нашли такую страницу</h1>
              <Link to={AppRoute.Catalog}>Загляните в наш каталог</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { NotFoundPage };