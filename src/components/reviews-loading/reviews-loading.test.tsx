import { render, screen } from '@testing-library/react';
import { ReviewsLoading } from './reviews-loading';

describe('Component: ReviewsLoading', () => {
  it('should render correctly', () => {
    const expectedText = /Ищем отзывы/i;

    render(<ReviewsLoading />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
