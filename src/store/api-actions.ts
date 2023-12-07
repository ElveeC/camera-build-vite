import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { ProductType, PromoType } from '../types/product-type.js';
import { ReviewType, PostingReviewType } from '../types/review-type.js';
import { APIRoute, NameSpace } from '../const';
import { toast } from 'react-toastify';

export const fetchProductsAction = createAsyncThunk<ProductType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Data}/fetchProducts`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<ProductType[]>(APIRoute.Products);
      return data;
    } catch {
      toast.error('Ошибка загружки. Сервер недоступен');
      throw new Error;
    }
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

export const fetchProductAction = createAsyncThunk<ProductType, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Data}/fetchProduct`,
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<ProductType>(`${APIRoute.Products}/${id}`);
      return data;
    } catch {
      toast.error('Ошибка загружки. Сервер недоступен');
      throw new Error;
    }
  },
);

export const fetchSimilarProductsAction = createAsyncThunk<ProductType[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Similar}/fetchSimilarProducts`,
  async (id, {extra: api}) => {
    const {data} = await api.get<ProductType[]>(`${APIRoute.Products}/${id}/similar`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<ReviewType[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (id, {extra: api}) => {
    const {data} = await api.get<ReviewType[]>(`${APIRoute.Products}/${id}/reviews`);
    return data;
  },
);

export const addReviewAction = createAsyncThunk<ReviewType, PostingReviewType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/addReview`,
  async ({ cameraId, userName, advantage, disadvantage, review, rating }, {extra: api}) => {
    try {
      const {data} = await api.post<ReviewType>(APIRoute.Reviews, { cameraId, userName, advantage, disadvantage, review, rating });
      return data;
    } catch {
      toast.error('Не удалось отправить отзыв. Сервер недоступен');
      throw new Error;
    }
  }
);
