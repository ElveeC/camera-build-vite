import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import { ScrollToTop } from './components/scroll-to-top/scroll-to-top';
import 'react-toastify/dist/ReactToastify.css';

import { App } from './components/app/app';
import { fetchProductsAction, fetchPromoProductsAction } from './store/api-actions';

store.dispatch(fetchProductsAction());
store.dispatch(fetchPromoProductsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <ScrollToTop />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
