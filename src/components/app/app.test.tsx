import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { App } from './app';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore, makeFakeProducts } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Catalog" when the user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Catalog);

    render(withStoreComponent);

    const expectedText = 'Каталог фото- и видеотехники';

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "ProductPage" when the user navigates to "/cameras/:id/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const products = makeFakeProducts();
    const product = products[0];
    const { withStoreComponent } = withStore(withHistoryComponent, {
      DATA: {
        products: products,
        areProductsLoading: false,
        product: products[0],
        isProductLoading: false,
        selectedProduct: null,
        hasError: false,
        isPopularChecked: false,
        isPriceChecked: false,
        isMinToMax: false,
        isMaxToMin: false,
        isPhotoChecked: false,
        isVideoChecked: false,
      },
      SIMILAR: {
        similarProducts: [],
        areSimilarProductsLoading: false,
      },
      REVIEWS: {
        reviews: [],
        areReviewsLoading: false,
        setReviewPostingStatus: Status.Unsent,
        isAddReviewModalActive: false
      },
    });

    const productTestId = 'productPageElement';
    mockHistory.push(`${AppRoute.Product}/${product.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId(productTestId)).toBeInTheDocument();
  });

  it('should render "Basket" when the user navigates to "/basket"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Basket);

    render(withStoreComponent);

    expect(screen.getByTestId('basketElement')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when the user navigates to a route that does not exist', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    const expectedText = 'Мы не нашли такую страницу';

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
