import { store } from '../store/index.js';
import { ProductType } from './product-type.js';

export type DataProcessType = {
  products: ProductType[];
  areProductsLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
