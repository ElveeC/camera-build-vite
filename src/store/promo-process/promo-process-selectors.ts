import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { PromoType } from '../../types/product-type';

//export const getPromoProducts = (state: State): PromoType[] => state[NameSpace.Promo].promoProducts;
//export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Promo].arePromoProductsLoading;

export const getPromoProducts = (state: State): PromoType[] => state[NameSpace.Promo].promoProducts;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Promo].arePromoProductsLoading;
