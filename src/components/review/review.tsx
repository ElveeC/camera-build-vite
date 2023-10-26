import { Rating } from '../rating/rating';
import { ReviewType } from '../../types/review-type';
import { humanizeDate } from '../../utils';
type ReviewProps = {
  reviewItem: ReviewType;
}

function Review ({ reviewItem }: ReviewProps) {
  const { userName, createAt, advantage, disadvantage, review, rating } = reviewItem;
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>{humanizeDate(createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        <Rating rating={rating}/>
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export { Review };
