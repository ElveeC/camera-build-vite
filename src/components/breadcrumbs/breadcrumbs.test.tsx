import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './breadcrumbs';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeProduct } from '../../mocks/mocks';
import { AppRoute } from '../../const';

describe('Component: Breadcrumbs', () => {
  const mockProduct = makeFakeProduct();
  const { name } = mockProduct;
  const expectedMainText = 'Главная';
  const expectedCatalogText = 'Каталог';
  const expectedProductNameText = `${name}`;

  it('should render correctly on the Catalog page', () => {

    const { withStoreComponent } = withStore(<Breadcrumbs currentPage={AppRoute.Catalog} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
  });

  it('should render correctly on the Product page', () => {

    const { withStoreComponent } = withStore(<Breadcrumbs currentPage={AppRoute.Product} productName={name}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
    expect(screen.getByText(expectedProductNameText)).toBeInTheDocument();
  });
});
