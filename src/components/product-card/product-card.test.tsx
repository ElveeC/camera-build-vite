import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { ProductCard } from './product-card';
import { makeFakeProduct } from '../../mocks/mocks';

describe('Component: ProductCard', () => {

  const product = makeFakeProduct();

  it('should render correctly with isSimilar=false', () => {
    const {
      name,
      reviewCount,
      price
    } = product;

    const expectedAltText = `${name}.`;
    const expectedReviewCountText = 'Всего оценок:';
    const expectedReviewCount = `${reviewCount}`;
    const expectedPriceText = 'Цена:';
    const expectedPrice = `${price} ₽`;
    const expectedDetailsText = 'Подробнее';

    const {withStoreComponent} = withStore(
      <ProductCard product={product} isSimilar={false}/>, {
        DATA: {
          products: [],
          areProductsLoading: false,
          product: product,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
          selectedProducts: [],
          isAddItemSuccessModalActive: false
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedReviewCountText)).toBeInTheDocument();
    expect(screen.getByText(expectedReviewCount)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByText(expectedPrice)).toBeInTheDocument();
    expect(screen.getByText(expectedDetailsText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render correctly with isSimilar=true', () => {
    const {
      name,
      reviewCount,
      price
    } = product;

    const expectedAltText = `${name}.`;
    const expectedReviewCountText = 'Всего оценок:';
    const expectedReviewCount = `${reviewCount}`;
    const expectedPriceText = 'Цена:';
    const expectedPrice = `${price} ₽`;
    const expectedDetailsText = 'Подробнее';

    const {withStoreComponent} = withStore(
      <ProductCard product={product} isSimilar/>, {
        DATA: {
          products: [],
          areProductsLoading: false,
          product: product,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
          selectedProducts: [],
          isAddItemSuccessModalActive: false
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedReviewCountText)).toBeInTheDocument();
    expect(screen.getByText(expectedReviewCount)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByText(expectedPrice)).toBeInTheDocument();
    expect(screen.getByText(expectedDetailsText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

});
