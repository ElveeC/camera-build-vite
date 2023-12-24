import { render, screen } from '@testing-library/react';
import { BasketRemoveModal } from './basket-remove-modal';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeProduct } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: BasketRemoveModal', () => {
  const mockProduct = makeFakeProduct();
  const {
    name,
    vendorCode,
    type,
    level
  } = mockProduct;

  it('should render correctly', () => {
    const expectedModalTitleText = 'Удалить этот товар?';
    const expectedAltText = `${name}.`;
    const expectedVendorCodeText = 'Артикул:';
    const expectedVendorCode = `${vendorCode}`;
    const expectedTypeText = `${type} камера`;
    const expectedLevelText = `${level} уровень`;
    const expectedRemoveText = 'Удалить';
    const expectedBackToCatalogText = 'Продолжить покупки';
    const expectedCloseText = 'Закрыть попап';


    const { withStoreComponent } = withStore(<BasketRemoveModal />, {
      DATA: {
        products: [],
        areProductsLoading: false,
        product: null,
        isProductLoading: false,
        hasError: false,
        selectedProduct: null,
        selectedProducts: [mockProduct],
        uniqueBasketProducts: [mockProduct],
        isAddItemSuccessModalActive: false,
        isBasketRemoveModalActive: false,
        productToRemove: mockProduct,
        setCouponSendingStatus: Status.Unsent,
        discount: 0,
        coupon: '',
        isCouponValid: false,
        order: null,
        orderPostingStatus: Status.Unsent,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedModalTitleText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedVendorCode)).toBeInTheDocument();
    expect(screen.getByText(expectedVendorCodeText)).toBeInTheDocument();
    expect(screen.getByText(expectedTypeText)).toBeInTheDocument();
    expect(screen.getByText(expectedLevelText)).toBeInTheDocument();
    expect(screen.getByText(expectedRemoveText)).toBeInTheDocument();
    expect(screen.getByText(expectedBackToCatalogText)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByLabelText(expectedCloseText)).toBeInTheDocument();
  });

});
