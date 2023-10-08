import {AxiosInstance} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { ProductType } from '../types/product-type.js';
import { loadProducts, setProductsDataLoadingStatus } from './action';
import { APIRoute } from '../const';

export const fetchQuestionAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setProductsDataLoadingStatus(true));
    const {data} = await api.get<ProductType[]>(APIRoute.Products);
    dispatch(loadProducts(data));
    dispatch(setProductsDataLoadingStatus(false));
  },
);
