import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';

import { Catalog } from '../../pages/catalog/catalog';
import { Basket } from '../../pages/basket/basket';
import { ProductPage } from '../../pages/product-page/product-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';

function App () {

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<Catalog />}
        />

        <Route
          path={`${AppRoute.Product}/:id`}
          element={<ProductPage />}
        />

        <Route
          path={AppRoute.Basket}
          element={<Basket />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export { App };
