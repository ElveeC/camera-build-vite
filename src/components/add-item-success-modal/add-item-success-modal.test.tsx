import { render, screen } from '@testing-library/react';
import { AddItemSuccessModal } from './add-item-success-modal';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakeProduct } from '../../mocks/mocks';
import { Status } from '../../const';

describe('Component: AddItemSuccessModal', () => {

  it('should render correctly', () => {
    const mockSelectedProduct = makeFakeProduct();

    const expectedModalTitleText = 'Товар успешно добавлен в корзину';
    const expectedBackToCatalogText = 'Продолжить покупки';
    const expecteToBasketText = 'Перейти в корзину';
    const expectedCloseText = 'Закрыть попап';


    const { withStoreComponent } = withStore(<AddItemSuccessModal />, {
      DATA: {
        products: [],
        areProductsLoading: false,
        product: null,
        isProductLoading: false,
        hasError: false,
        selectedProduct: null,
        selectedProducts: [mockSelectedProduct],
        uniqueBasketProducts: [mockSelectedProduct],
        isAddItemSuccessModalActive: true,
        isBasketRemoveModalActive: false,
        productToRemove: null,
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
    expect(screen.getByText(expectedBackToCatalogText)).toBeInTheDocument();
    expect(screen.getByText(expecteToBasketText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedCloseText)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(2);
  });

});
