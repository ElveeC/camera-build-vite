import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { ProductType } from '../../types/product-type';

export const getProducts = (state: State): ProductType[] => state[NameSpace.Data].products;
export const getProductsLoadingStatus = (state: State): boolean => state[NameSpace.Data].areProductsLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;

export const getProduct = (state: State): ProductType | null => state[NameSpace.Data].product;
export const getProductLoadingStatus = (state: State): boolean => state[NameSpace.Data].isProductLoading;

export const getSelectedProduct = (state: State): ProductType | null =>state[NameSpace.Data].selectedProduct;

export const getSelectedProducts = (state: State): ProductType[] => state[NameSpace.Data].selectedProducts;

export const getUniqueBasketProducts = (state: State): ProductType[] => state[NameSpace.Data].uniqueBasketProducts;

export const getAddItemSuccessModalStatus = (state: State): boolean => state[NameSpace.Data].isAddItemSuccessModalActive;

export const getBasketRemoveModalStatus = (state: State): boolean => state[NameSpace.Data].isBasketRemoveModalActive;

export const getProductToRemove = (state: State): ProductType | null =>state[NameSpace.Data].productToRemove;
