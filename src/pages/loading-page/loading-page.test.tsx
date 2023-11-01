import { render, screen } from '@testing-library/react';
import { LoadingPage } from './loading-page';

describe('Component: LoadingPage', () => {
  it('should render correctly', () => {
    const expectedText = /Секундочку... Мы ищем самые классные камеры для вас/i;

    render(<LoadingPage />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
