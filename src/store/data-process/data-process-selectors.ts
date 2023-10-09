import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { ProductType } from '../../types/product-type';

export const getProducts = (state: State): ProductType[] => state[NameSpace.Data].products;
export const getProductsLoadingStatus = (state: State): boolean => state[NameSpace.Data].areProductsLoading;

export const getProduct = (state: State): ProductType | null => state[NameSpace.Data].product;
export const getProductLoadingStatus = (state: State): boolean => state[NameSpace.Data].isProductLoading;
