import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { ProductPage } from './product-page';
import { makeFakeProduct, makeFakeReviews, makeFakeSimilarProducts } from '../../mocks/mocks';
import { Status } from '../../const';


describe('Component: ProductPage', () => {
  const mockProduct = makeFakeProduct();
  const mockReviews = makeFakeReviews();
  const mockSimilarProducts = makeFakeSimilarProducts();

  it('should render correctly', () => {

    const productElementByTestId = 'productElement';
    const similarElementByTestId = 'similarElement';
    const reviewsElementByTestId = 'reviewsElement';

    const {withStoreComponent} = withStore(<ProductPage />, {
      DATA: {
        products: [],
        areProductsLoading: false,
        product: mockProduct,
        isProductLoading: false,
        selectedProduct: null,
        hasError: false,
        selectedProducts: [],
        isAddItemSuccessModalActive: false
      },
      PROMO: {
        promoProducts: [],
        arePromoProductsLoading: false
      },
      SIMILAR: {
        similarProducts: mockSimilarProducts,
        areSimilarProductsLoading: false,
      },
      REVIEWS: {
        reviews: mockReviews,
        areReviewsLoading: false,
        setReviewPostingStatus: Status.Unsent,
        isAddReviewModalActive: false
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(productElementByTestId)).toBeInTheDocument();
    expect(screen.getByTestId(similarElementByTestId)).toBeInTheDocument();
    expect(screen.getByTestId(reviewsElementByTestId)).toBeInTheDocument();
  });
});
