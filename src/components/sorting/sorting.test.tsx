import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { Sorting } from './sorting';

describe('Component: Sorting', () => {

  it('should render correctly', () => {
    const expectedSortingText = 'Сортировать:';
    const expectedPriceText = 'по цене';
    const expectedPopularProductsText = 'по популярности';
    const expectedUpLabelText = 'По возрастанию';
    const expectedDownLabelText = 'По убыванию';

    const { withStoreComponent } = withStore(<Sorting />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedSortingText)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByText(expectedPopularProductsText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedUpLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedDownLabelText)).toBeInTheDocument();
  });
});
