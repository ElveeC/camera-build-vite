import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productData } from './product-data/product-data';
import { promoData } from './promo-data/promo-data';
import { similarData } from './similar-data/similar-data';
import { reviewsData } from './reviews-data/reviews-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: productData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Similar]: similarData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer
});
