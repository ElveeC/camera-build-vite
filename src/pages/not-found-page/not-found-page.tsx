import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

//import { Header } from '../../components/header/header';
//import { Footer } from '../../components/footer/footer';
//import { Banner } from '../../components/banner/banner';
import { AppRoute } from '../../const';
import './not-found-page.css';

function NotFoundPage () {

  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera shop. Страница не найдена</title>
      </Helmet>
      <main>
        <div className="page-content">
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Мы не нашли такую страницу</h1>
              <p>Загляните в наш <Link className="not-found-link" to={AppRoute.Catalog}>каталог</Link></p>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}

export { NotFoundPage };
