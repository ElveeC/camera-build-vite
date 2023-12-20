import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchProductsAction, fetchProductAction, fetchPromoProductsAction, fetchReviewsAction, fetchSimilarProductsAction, addReviewAction, postOrderAction, sendCouponAction } from './api-actions';
import { makeFakeProduct, makeFakeProducts, makeFakeReviews, makeFakeNewReview, makeFakePromos, makeFakeSimilarProducts } from '../mocks/mocks';
import { APIRoute } from '../const';


type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({DATA: {products: []}});
  });

  describe('fetchProductsAction', () => {
    it('should dispatch "fetchProductsAction.pending", "fetchProductsAction.fullfiled" when server response 200', async () => {
      const mockProducts = makeFakeProducts();
      mockAxiosAdapter.onGet(APIRoute.Products).reply(200, mockProducts);

      await store.dispatch(fetchProductsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.fulfilled.type
      ]);

      expect(fetchProductsActionFulfilled.payload).toEqual(mockProducts);
    });

    it('should dispatch "fetchProductsAction.pending", "fetchProductsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Products).reply(400, []);

      await store.dispatch(fetchProductsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchProductAction', () => {
    const mockProduct = makeFakeProduct();

    it('should dispatch "fetchProductAction.pending", "fetchProductAction.fulfilled" when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}`).reply(200, mockProduct);

      await store.dispatch(fetchProductAction(mockProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProductAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchProductAction.pending.type,
        fetchProductAction.fulfilled.type,
      ]);

      expect(fetchProductActionFulfilled.payload)
        .toEqual(mockProduct);
    });

    it('should dispatch "fetchProductAction.pending", "fetchProductAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}`).reply(400, []);

      await store.dispatch(fetchProductAction(mockProduct.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductAction.pending.type,
        fetchProductAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoProductsAction', () => {
    it('should dispatch "fetchPromoProductsAction.pending", "fetchPromoProductsAction.fullfiled" when server response 200', async () => {
      const mockPromos = makeFakePromos();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromos);

      await store.dispatch(fetchPromoProductsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoProductsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoProductsAction.pending.type,
        fetchPromoProductsAction.fulfilled.type
      ]);

      expect(fetchPromoProductsActionFulfilled.payload).toEqual(mockPromos);
    });

    it('should dispatch "fetchPromoProductsAction.pending", "fetchPromoProductsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoProductsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoProductsAction.pending.type,
        fetchPromoProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarProductsAction', () => {
    const mockProduct = makeFakeProduct();
    const mockSimilarProducts = makeFakeSimilarProducts();

    it('should dispatch "fetchSimilarProductsAction.pending", "fetchSimilarProductsAction.fulfilled" when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}${APIRoute.Similar}`).reply(200, mockSimilarProducts);

      await store.dispatch(fetchSimilarProductsAction(mockProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarProductsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.fulfilled.type,
      ]);

      expect(fetchSimilarProductsActionFulfilled.payload)
        .toEqual(mockSimilarProducts);
    });

    it('should dispatch "fetchSimilarProductsAction.pending", "fetchSimilarProductsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}${APIRoute.Similar}`).reply(400, []);

      await store.dispatch(fetchSimilarProductsAction(mockProduct.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    const mockProduct = makeFakeProduct();
    const mockReviews = makeFakeReviews();

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled" when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}${APIRoute.Reviews}`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(mockProduct.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}${APIRoute.Reviews}`).reply(400, []);

      await store.dispatch(fetchReviewsAction(mockProduct.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('addReviewAction', () => {
    const mockNewReview = makeFakeNewReview();
    const {cameraId, userName, advantage, disadvantage, review, rating} = mockNewReview;

    it('should dispatch "addReviewAction.pending", "addReviewAction.fulfilled" when server response 200', async() => {
      mockAxiosAdapter.onPost(APIRoute.Reviews, { cameraId, userName, advantage, disadvantage, review, rating }).reply(200, mockNewReview);

      await store.dispatch(addReviewAction({ cameraId, userName, advantage, disadvantage, review, rating }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const addReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof addReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        addReviewAction.pending.type,
        addReviewAction.fulfilled.type,
      ]);

      expect(addReviewActionFulfilled.payload)
        .toEqual(mockNewReview);
    });

    it('should dispatch "addReviewAction.pending", "addReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews, { cameraId, userName, advantage, disadvantage, review, rating }).reply(400, []);

      await store.dispatch(addReviewAction({ cameraId, userName, advantage, disadvantage, review, rating }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addReviewAction.pending.type,
        addReviewAction.rejected.type,
      ]);
    });
  });

  describe('sendCouponAction', () => {
    const validCouponValue = 'camera-333';
    const invalidCouponValue = 'fkldsj';
    const discount = 15;

    it('should dispatch "sendCouponAction.pending", "sendCouponAction.fulfilled" when server response 200', async() => {
      mockAxiosAdapter.onPost(APIRoute.Coupons, { coupon: validCouponValue }).reply(200, discount);

      await store.dispatch(sendCouponAction({ coupon: validCouponValue }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendCouponActionFulfilled = emittedActions.at(1) as ReturnType<typeof sendCouponAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        sendCouponAction.pending.type,
        sendCouponAction.fulfilled.type,
      ]);

      expect(sendCouponActionFulfilled.payload)
        .toEqual(discount);
    });

    it('should dispatch "sendCouponAction.pending", "sendCouponAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Coupons, { coupon: invalidCouponValue }).reply(400, []);

      await store.dispatch(sendCouponAction({ coupon: invalidCouponValue }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendCouponAction.pending.type,
        sendCouponAction.rejected.type,
      ]);
    });
  });

  describe('postOrderAction', () => {

    it('should dispatch "postOrderAction.pending", "postOrderAction.fulfilled" when server response 200', async() => {
      mockAxiosAdapter.onPost(APIRoute.Order, { camerasIds: [1, 2], coupon: null }).reply(200, []);

      await store.dispatch(postOrderAction({ camerasIds: [1, 2], coupon: null }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postOrderActionFulfilled = emittedActions.at(1) as ReturnType<typeof postOrderAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postOrderAction.pending.type,
        postOrderAction.fulfilled.type,
      ]);

      expect(postOrderActionFulfilled.payload)
        .toEqual([]);
    });

    it('should dispatch "postOrderAction.pending", "postOrderAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Order, { camerasIds: [1, 2], coupon: null }).reply(400, []);

      await store.dispatch(postOrderAction({ camerasIds: [1, 2], coupon: null }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOrderAction.pending.type,
        postOrderAction.rejected.type,
      ]);
    });
  });

});
