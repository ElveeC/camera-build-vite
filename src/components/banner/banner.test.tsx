import { render, screen } from '@testing-library/react';
import { Banner } from './banner';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeFakePromos } from '../../mocks/mocks';

describe('Component: Banner', () => {
  const mockPromoProducts = makeFakePromos();
  const { name } = mockPromoProducts[0];

  it('should render correctly', () => {

    const expectedAltText = `${name}.`;
    const expectedMessageText = 'Новинка!';
    const expectedNameText = `${name}`;
    const expectedBannerText = 'Профессиональная камера от известного производителя';
    const expectedLinkText = 'Подробнее';
    const slideElementByTestId = 'slideElement';

    const { withStoreComponent } = withStore(<Banner />, {
      PROMO: {
        promoProducts: mockPromoProducts,
        arePromoProductsLoading: false
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getAllByText(expectedMessageText).length).toBe(3);
    expect(screen.getByText(expectedNameText)).toBeInTheDocument();
    expect(screen.getAllByText(expectedBannerText).length).toBe(3);
    expect(screen.getAllByText(expectedLinkText).length).toBe(3);
    expect(screen.getAllByTestId(slideElementByTestId).length).toBe(3);
  });

});
