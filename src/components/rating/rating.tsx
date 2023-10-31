import { createFullStarsArray, createStarsArray } from '../../utils';

type RatingProps = {
  rating: number;
}

function Rating ({ rating }: RatingProps) {

  const fullStars = createFullStarsArray(rating);
  const stars = createStarsArray(rating);

  return (
    <>
      {fullStars.map((_, index) => (
        <svg width="17" height="16" aria-hidden="true" key={`full-star-${1 + index}`} data-testid="full-star">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
      ))}
      {stars.map((_, index) => (
        <svg width="17" height="16" aria-hidden="true" key={`star-${1 + index}`} data-testid="star">
          <use xlinkHref="#icon-star"></use>
        </svg>
      ))}
    </>
  );
}

export { Rating };
