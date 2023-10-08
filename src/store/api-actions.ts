import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { ProductType, PromoType } from '../types/product-type.js';
import { APIRoute, NameSpace } from '../const';

export const fetchProductsAction = createAsyncThunk<ProductType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Data}/fetchProducts`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ProductType[]>(APIRoute.Products);
    return data;
  },
);

export const fetchPromoProductsAction = createAsyncThunk<PromoType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Promo}/fetchPromoProducts`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoType[]>(APIRoute.Promo);
    return data;
  },
);
