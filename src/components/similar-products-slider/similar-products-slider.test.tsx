import { render, screen } from '@testing-library/react';
import { SimilarProductsSlider } from './similar-products-slider';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeSimilarProducts } from '../../mocks/mocks';

describe('Component: SimilarProductsSlider', () => {
  const mockSimilarProducts = makeFakeSimilarProducts();

  it('should render correctly', () => {

    const expectedTitleText = 'Похожие товары';
    const similarSlideElementByTestId = 'similarSlideElement';
    const expectedPreviousSlideLabelText = 'Предыдущий слайд';
    const expectedNextSlideLabelText = 'Следующий слайд';

    const { withStoreComponent } = withStore(<SimilarProductsSlider id={1}/>, {
      SIMILAR: {
        similarProducts: mockSimilarProducts,
        areSimilarProductsLoading: false
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getAllByTestId(similarSlideElementByTestId).length).toBe(3);
    expect(screen.getByLabelText(expectedPreviousSlideLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedNextSlideLabelText)).toBeInTheDocument();
  });

  it('should not render if there are no similar products', () => {

    const notExpectedSimilarElementByTestId = 'similarElement';

    const { withStoreComponent } = withStore(<SimilarProductsSlider id={1}/>, {
      SIMILAR: {
        similarProducts: [],
        areSimilarProductsLoading: false
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByTestId(notExpectedSimilarElementByTestId)).not.toBeInTheDocument();
  });

  it('should not render if similar products are loading', () => {

    const notExpectedSimilarElementByTestId = 'similarElement';

    const { withStoreComponent } = withStore(<SimilarProductsSlider id={1}/>, {
      SIMILAR: {
        similarProducts: mockSimilarProducts,
        areSimilarProductsLoading: true
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByTestId(notExpectedSimilarElementByTestId)).not.toBeInTheDocument();
  });

});
