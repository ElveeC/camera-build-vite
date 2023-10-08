import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { ProductType } from '../../types/product-type';

export const getProducts = (state: State): ProductType[] => state[NameSpace.Data].products;
export const getProductsLoadingStatus = (state: State): boolean => state[NameSpace.Data].areProductsLoading;
