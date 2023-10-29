import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Catalog } from '../../pages/catalog/catalog';
import { Basket } from '../../pages/basket/basket';
import { ProductPage } from '../../pages/product-page/product-page';
import { ErrorPage } from '../../pages/error-page/error-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';

import { getErrorStatus } from '../../store/data-process/data-process-selectors';
import { useAppSelector } from '../../hooks';

import { AppRoute } from '../../const';

function App () {
  const hasError = useAppSelector(getErrorStatus);

  if (hasError) {
    return (
      <ErrorPage />);
  }

  return (
    <HelmetProvider>
      <Routes>

        <Route path={AppRoute.Catalog} element={<Catalog />}>
          <Route path="catalog/:page" element={<Catalog />} />
        </Route>

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
