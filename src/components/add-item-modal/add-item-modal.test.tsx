import { render, screen } from '@testing-library/react';
import { AddItemModal } from './add-item-modal';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeProduct } from '../../mocks/mocks';

describe('Component: AddItemModal', () => {
  const mockSelectedProduct = makeFakeProduct();
  const {
    name,
    vendorCode,
    type,
    level
  } = mockSelectedProduct;
  it('should render correctly', () => {
    const expectedModalTitleText = 'Добавить товар в корзину';
    const expectedAltText = `${name}.`;
    const expectedProductNameText = `${name}`;
    const expectedArticleText = 'Артикул:';
    const expectedPriceText = 'Цена:';
    const expectedVendorCodeText = `${vendorCode}`;
    const expectedTypeText = `${type}`;
    const expectedLevelText = `${level}`;
    const expectedAddToBasketText = 'Добавить в корзину';
    const basketButtonElementTestId = 'basketButtonElement';
    const expectedCloseText = 'Закрыть попап';


    const { withStoreComponent } = withStore(<AddItemModal />, {
      DATA: {
        products: [],
        areProductsLoading: false,
        product: mockSelectedProduct,
        isProductLoading: false,
        hasError: false,
        selectedProduct: mockSelectedProduct,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedModalTitleText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedProductNameText)).toBeInTheDocument();
    expect(screen.getByText(expectedArticleText)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByText(expectedVendorCodeText)).toBeInTheDocument();
    expect(screen.getByText(expectedTypeText)).toBeInTheDocument();
    expect(screen.getByText(expectedLevelText)).toBeInTheDocument();
    expect(screen.getByText(expectedAddToBasketText)).toBeInTheDocument();
    expect(screen.getByTestId(basketButtonElementTestId)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedCloseText)).toBeInTheDocument();
  });

});
