import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { ProductType } from '../../types/product-type';

export const getSimilarProducts = (state: State): ProductType[] => state[NameSpace.Similar].similarProducts;
export const getSimilarProductsLoadingStatus = (state: State): boolean => state[NameSpace.Similar].areSimilarProductsLoading;
