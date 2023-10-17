import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataProcess } from './data-process/data-process';
import { promoProcess } from './promo-process/promo-process';
import { similarProcess } from './similar-process/similar-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.Promo]: promoProcess.reducer,
  [NameSpace.Similar]: similarProcess.reducer
});
