import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchPromoProductsAction } from '../api-actions';
import { PromoDataType } from '../../types/state';

const initialState: PromoDataType = {
  promoProducts: [],
  arePromoProductsLoading: false
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(fetchPromoProductsAction.pending, (state) => {
        state.arePromoProductsLoading = true;
      })
      .addCase(fetchPromoProductsAction.fulfilled, (state, action) => {
        state.promoProducts = action.payload;
        state.arePromoProductsLoading = false;
      })
      .addCase(fetchPromoProductsAction.rejected, (state) => {
        state.arePromoProductsLoading = false;
      });
  }
});
