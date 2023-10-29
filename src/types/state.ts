import { store } from '../store/index.js';
import { ProductType, PromoType } from './product-type.js';
import { ReviewType } from './review-type.js';
import { Status } from '../const.js';

export type DataProcessType = {
  products: ProductType[];
  areProductsLoading: boolean;
  product: ProductType | null;
  isProductLoading: boolean;
  selectedProduct: ProductType | null;
  hasError: boolean;
}

export type PromoProcessType = {
  promoProducts: PromoType[];
  arePromoProductsLoading: boolean;
}

export type SimilarProcessType = {
  similarProducts: ProductType[];
  areSimilarProductsLoading: boolean;
}

export type ReviewsProcessType = {
  reviews: ReviewType[];
  areReviewsLoading: boolean;
  setReviewPostingStatus: Status;
  isReviewSuccessModalActive: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
