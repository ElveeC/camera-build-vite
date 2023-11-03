import { fetchSimilarProductsAction } from '../api-actions';
import { similarData } from './similar-data';
import { makeFakeSimilarProducts } from '../../mocks/mocks';

describe('SimilarData Slice', () => {
  const initialState = {
    similarProducts: [],
    areSimilarProductsLoading: false,
  };

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = {...initialState};

    const result = similarData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return the default initial state with an empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {...initialState};

    const result = similarData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "areSimilarProductsLoading" to "true" with "fetchSimilarProductsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      areSimilarProductsLoading: true,
    };

    const result = similarData.reducer(undefined, fetchSimilarProductsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "similarProducts" to an array with similarProducts, "areSimilarProductsLoading" to "false" with "fetchSimilarProductsAction.fulfilled"', () => {
    const mockProducts = makeFakeSimilarProducts();
    const newInitialState = {
      ...initialState,
      areSimilarProductsLoading: true
    };
    const expectedState = {
      ...initialState,
      similarProducts: mockProducts,
      areSimilarProductsLoading: false
    };

    const result = similarData.reducer({...newInitialState}, {type: fetchSimilarProductsAction.fulfilled.type, payload: mockProducts});

    expect(result).toEqual(expectedState);
  });

  it('should set "areSimilarProductsLoading" to "false" with "fetchSimilarProductsAction.rejected', () => {
    const newInitialState = {
      ...initialState,
      areSimilarProductsLoading: true
    };
    const expectedState = {
      ...initialState,
      areSimilarProductsLoading: false
    };

    const result = similarData.reducer(
      {...newInitialState},
      fetchSimilarProductsAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});
