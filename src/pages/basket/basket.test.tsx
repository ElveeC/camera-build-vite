import { render, screen } from '@testing-library/react';
import { Basket } from './basket';
import { withHistory } from '../../mocks/mock-component';

describe('Component: Basket', () => {
  it('should render correctly', () => {
    const expectedTitleText = 'Корзина';
    const basketElementByTestId = 'basketElement';

    render(withHistory(<Basket />));

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByTestId(basketElementByTestId)).toBeInTheDocument();
  });
});
