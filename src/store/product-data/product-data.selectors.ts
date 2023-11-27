import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { ProductType } from '../../types/product-type';

export const getProducts = (state: State): ProductType[] => state[NameSpace.Data].products;
export const getProductsLoadingStatus = (state: State): boolean => state[NameSpace.Data].areProductsLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;

export const getProduct = (state: State): ProductType | null => state[NameSpace.Data].product;
export const getProductLoadingStatus = (state: State): boolean => state[NameSpace.Data].isProductLoading;

export const getSelectedProduct = (state: State): ProductType | null =>state[NameSpace.Data].selectedProduct;

export const getSortByPriceStatus = (state: State): boolean => state[NameSpace.Data].isPriceChecked;
export const getSortByPopularityStatus = (state: State): boolean => state[NameSpace.Data].isPopularChecked;

export const getMinToMaxSortStatus = (state: State): boolean => state[NameSpace.Data].isMinToMax;
export const getMaxToMinSortStatus = (state: State): boolean => state[NameSpace.Data].isMaxToMin;

export const getPhotoCheckedStatus = (state: State): boolean => state[NameSpace.Data].isPhotoChecked;
export const getVideoCheckedStatus = (state: State): boolean => state[NameSpace.Data].isVideoChecked;

export const getCurrentPageNumber = (state: State): number => state[NameSpace.Data].currentPageNumber;
