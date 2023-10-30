import { fetchPromoProductsAction } from '../api-actions';
import { promoData } from './promo-data';
import { makeFakePromos } from '../../mocks/mocks';

describe('PromoData Slice', () => {
  const initialState = {
    promoProducts: [],
    arePromoProductsLoading: false
  };

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = {...initialState};

    const result = promoData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return the default initial state with an empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {...initialState};

    const result = promoData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "arePromoProductsLoading" to "true" with "fetchPromoProductsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      arePromoProductsLoading: true,
    };

    const result = promoData.reducer(undefined, fetchPromoProductsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "promoProducts" to an array with promoProducts, "arePromoProductsLoading" to "false" with "fetchPromoProductsAction.fulfilled"', () => {
    const mockProducts = makeFakePromos();
    const expectedState = {
      ...initialState,
      promoProducts: mockProducts,
      arePromoProductsLoading: false
    };

    const result = promoData.reducer(
      undefined,
      fetchPromoProductsAction.fulfilled(
        mockProducts, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "arePromoProductsLoading" to "false" with "fetchPromoProductsAction.rejected', () => {
    const expectedState = {
      ...initialState,
      arePromoProductsLoading: false
    };

    const result = promoData.reducer(
      undefined,
      fetchPromoProductsAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});
