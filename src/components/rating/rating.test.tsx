import { render, screen } from '@testing-library/react';
import { Rating } from './rating';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    const expectedFullStarCount = 3;
    const expectedStarCount = 2;
    const fullStarTestId = 'full-star';
    const starTestId = 'star';

    render(<Rating rating={expectedFullStarCount} />);
    const fullStars = screen.getAllByTestId(fullStarTestId);
    const stars = screen.getAllByTestId(starTestId);

    expect(fullStars.length).toBe(expectedFullStarCount);
    expect(stars.length).toBe(expectedStarCount);
  });
});
