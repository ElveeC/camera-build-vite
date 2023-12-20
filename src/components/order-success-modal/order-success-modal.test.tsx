import { render, screen } from '@testing-library/react';
import { OrderSuccessModal } from './order-success-modal';
import { withStore, withHistory } from '../../mocks/mock-component';
import { Status } from '../../const';

describe('Component: OrderSuccessModal', () => {

  it('should render correctly', () => {
    const expectedModalTitleText = 'Спасибо за покупку';
    const expectedBackToCatalogText = 'Вернуться к покупкам';
    const expectedCloseText = 'Закрыть попап';

    const { withStoreComponent } = withStore(<OrderSuccessModal />, {
      DATA: {
        products: [],
        areProductsLoading: false,
        product: null,
        isProductLoading: false,
        hasError: false,
        selectedProduct: null,
        selectedProducts: [],
        uniqueBasketProducts: [],
        isAddItemSuccessModalActive: false,
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
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByLabelText(expectedCloseText)).toBeInTheDocument();
  });

});
