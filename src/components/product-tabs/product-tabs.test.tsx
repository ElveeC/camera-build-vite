import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { ProductTabs } from './product-tabs';
import { makeFakeProduct } from '../../mocks/mocks';

describe('Component: ProductTabs', () => {

  const product = makeFakeProduct();

  it('should render correctly when the description option is active', () => {

    const expectedSpecificationText = 'Характеристики';
    const expectedDescriptionText = 'Описание';

    const {withStoreComponent} = withStore(
      <ProductTabs product={product} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedSpecificationText)).toBeInTheDocument();
    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
  });

});
