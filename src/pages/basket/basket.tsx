import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';

function Basket () {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera shop. Корзина</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <section className="basket" data-testid="basketElement">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { Basket };
