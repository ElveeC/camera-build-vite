import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { Pagination } from './pagination';
import { makeFakeProducts } from '../../mocks/mocks';

describe('Component: Pagination', () => {

  const products = makeFakeProducts();
  const pageButtonElement = 'pageButtonElement';

  it('should render correctly with page 1, 1 page', () => {
    const productsToRender = products.slice(0, 5);
    const notExpectedBackElement = 'backElement';
    const notExpectedNextButtonElement = 'nextElement';

    const {withStoreComponent} = withStore(
      <Pagination currentPage={1} pageCount={1} />, {
        DATA: {
          products: productsToRender,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.queryByTestId(notExpectedBackElement)).not.toBeInTheDocument();
    expect(screen.getAllByTestId(pageButtonElement).length).toBe(1);
    expect(screen.queryByTestId(notExpectedNextButtonElement)).not.toBeInTheDocument();
  });


  it('should render correctly with page 1, 2 pages', () => {
    const productsToRender = products.slice(0, 15);
    const notExpectedBackElement = 'backElement';
    const notExpectedNextButtonElement = 'nextElement';

    const {withStoreComponent} = withStore(
      <Pagination currentPage={1} pageCount={2} />, {
        DATA: {
          products: productsToRender,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.queryByTestId(notExpectedBackElement)).not.toBeInTheDocument();
    expect(screen.getAllByTestId(pageButtonElement).length).toBe(2);
    expect(screen.queryByTestId(notExpectedNextButtonElement)).not.toBeInTheDocument();
  });

  it('should render correctly with page 1, 4 pages', () => {
    const productsToRender = products.slice(0, 30);
    const notExpectedBackElement = 'backElement';
    const nextButtonElement = 'nextElement';

    const {withStoreComponent} = withStore(
      <Pagination currentPage={1} pageCount={4} />, {
        DATA: {
          products: productsToRender,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.queryByTestId(notExpectedBackElement)).not.toBeInTheDocument();
    expect(screen.getAllByTestId(pageButtonElement).length).toBe(3);
    expect(screen.getByTestId(nextButtonElement)).toBeInTheDocument();
  });

  it('should render correctly with page 4, 4 pages', () => {
    const productsToRender = products.slice(0, 30);
    const backElement = 'backElement';
    const notExpectedNextButtonElement = 'nextElement';


    const {withStoreComponent} = withStore(
      <Pagination currentPage={4} pageCount={4} />, {
        DATA: {
          products: productsToRender,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(backElement)).toBeInTheDocument();
    expect(screen.getAllByTestId(pageButtonElement).length).toBe(1);
    expect(screen.queryByTestId(notExpectedNextButtonElement)).not.toBeInTheDocument();
  });

  it('should render correctly with page 4, 7 pages', () => {
    const productsToRender = products.slice();
    const backElement = 'backElement';
    const nextButtonElement = 'nextElement';


    const {withStoreComponent} = withStore(
      <Pagination currentPage={4} pageCount={7} />, {
        DATA: {
          products: productsToRender,
          areProductsLoading: false,
          product: null,
          isProductLoading: false,
          hasError: false,
          selectedProduct: null,
        },
      });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(backElement)).toBeInTheDocument();
    expect(screen.getAllByTestId(pageButtonElement).length).toBe(3);
    expect(screen.getByTestId(nextButtonElement)).toBeInTheDocument();
  });
});
