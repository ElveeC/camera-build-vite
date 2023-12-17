import { store } from '../store/index.js';
import { ProductType, PromoType } from './product-type.js';
import { ReviewType } from './review-type.js';
import { Status } from '../const.js';

export type ProductDataType = {
  products: ProductType[];
  areProductsLoading: boolean;
  product: ProductType | null;
  isProductLoading: boolean;
  selectedProduct: ProductType | null;
  selectedProducts: ProductType[];
  uniqueBasketProducts: ProductType[];
  hasError: boolean;
  isAddItemSuccessModalActive: boolean;
  isBasketRemoveModalActive: boolean;
  productToRemove: ProductType | null;
}

export type PromoDataType = {
  promoProducts: PromoType[];
  arePromoProductsLoading: boolean;
}

export type SimilarDataType = {
  similarProducts: ProductType[];
  areSimilarProductsLoading: boolean;
}

export type ReviewsDataType = {
  reviews: ReviewType[];
  areReviewsLoading: boolean;
  setReviewPostingStatus: Status;
  isAddReviewModalActive: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
