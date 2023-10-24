import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { getReviews, getReviewsLoadingStatus } from '../../store/reviews-process/reviews-process-selectors';
import { fetchReviewsAction } from '../../store/api-actions';

import { ReviewsLoading } from '../reviews-loading/reviews-loading';
import { Review } from '../review/review';
import { ReviewType } from '../../types/review-type';
import { REVIEWS_TO_SHOW_COUNT } from '../../const';

type ReviewsProps = {
  cameraId: number;
}

function Reviews ({ cameraId }: ReviewsProps) {
  //const [ sliceToShow, setSliceToShow ] = useState(1);
  const [ reviewsToShowCount, setReviewsToShowCount ] = useState(REVIEWS_TO_SHOW_COUNT);

  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const areReviewsLoading = useAppSelector(getReviewsLoadingStatus);

  useEffect(() => {
    if (cameraId) {
      dispatch(fetchReviewsAction(cameraId));
    }
  }, [dispatch, cameraId]);

  if (areReviewsLoading) {
    return <ReviewsLoading/>;
  }

  if (!reviews.length) {
    return '';
  }

  const sortedReviews = reviews.slice().sort((a: ReviewType, b: ReviewType) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
  //const reviewsSliceCount = sortedReviews.length / 3;
  const handleMoreButtonClick = () => {
    //setSliceToShow(sliceToShow + 1);
    setReviewsToShowCount(reviewsToShowCount + REVIEWS_TO_SHOW_COUNT);
  };

  const reviewsToShow = sortedReviews.slice(0, reviewsToShowCount);


  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {reviewsToShow.map((review) =>
            <Review key={review.id} reviewItem={review} />
          )}
        </ul>
        {reviewsToShowCount < sortedReviews.length &&
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button" onClick={handleMoreButtonClick}>Показать больше отзывов
          </button>
        </div>}
      </div>
    </section>
  );
}

export { Reviews };
