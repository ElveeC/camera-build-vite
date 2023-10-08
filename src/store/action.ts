import { createAction } from '@reduxjs/toolkit';
import { ProductType } from '../types/product-type';

export const loadProducts = createAction('data/loadProducts', (products: ProductType[]) => ({
  payload: products
}));
