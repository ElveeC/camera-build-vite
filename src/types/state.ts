import { store } from '../store/index.js';
import { ProductType, PromoType } from './product-type.js';

export type DataProcessType = {
  products: ProductType[];
  areProductsLoading: boolean;
}

export type PromoProcessType = {
  promoProducts: PromoType[];
  arePromoProductsLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
