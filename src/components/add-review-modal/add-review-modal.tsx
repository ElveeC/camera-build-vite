import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'classnames';
//import { useAppDispatch } from '../../hooks';
//import { reviewSubmitAction } from '../../store/api-actions';
//import './add-review-modal.css';


type AddReviewModalProps = {
  onCloseButtonClick: () => void;
}

type AddReviewFormValues = {
  //cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

function AddReviewModal ({ onCloseButtonClick }: AddReviewModalProps) {
  //const dispatch = useAppDispatch();
  //const REGEX_NAME = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z]{2,160}$/;

  //const isTextValid = (value: string) => REGEX_NAME.test(value);

  const { register, handleSubmit, formState: { errors } } = useForm<AddReviewFormValues>();
  const onSubmit: SubmitHandler<AddReviewFormValues> = ({ userName, advantage, disadvantage, review, rating }) => {

    /*dispatch(reviewSubmitAction({
      userName: userName,
      advantage: advantage,
      disadvantage: disadvantage,
      review: review,
      rating: rating
    }));*/
    // eslint-disable-next-line no-console
    console.log(userName);
    // eslint-disable-next-line no-console
    console.log(advantage);
    // eslint-disable-next-line no-console
    console.log(disadvantage);
    // eslint-disable-next-line no-console
    console.log(review);
    // eslint-disable-next-line no-console
    console.log(rating);
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form
              method="post"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-review__rate">
                <fieldset
                  className={cn(
                    'rate',
                    'form-review__item',
                    {'is-invalid': errors.rating}
                  )}
                >
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input className="visually-hidden" id="star-5" type="radio" value={5} {...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" id="star-4" type="radio" value={4} {...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" id="star-3" type="radio" value={3} {...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" id="star-2" type="radio" value={2} {...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" id="star-1" type="radio" value={1} {...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div
                  className={cn(
                    'custom-input',
                    'form-review__item',
                    {'is-invalid': errors.userName}
                  )}
                >
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Введите ваше имя"
                      {...register('userName', {required: true})}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div
                  className={cn(
                    'custom-input',
                    'form-review__item',
                    {'is-invalid': errors.advantage}
                  )}
                >
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Основные преимущества товара"
                      {...register('advantage', {required: true})}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div
                  className={cn(
                    'custom-input',
                    'form-review__item',
                    {'is-invalid': errors.disadvantage}
                  )}
                >
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Главные недостатки товара"
                      {...register('disadvantage', {required: true})}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div
                  className={cn(
                    'custom-textarea',
                    'form-review__item',
                    {'is-invalid': errors.review}
                  )}

                >
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      placeholder="Поделитесь своим опытом покупки"
                      {...register('review',
                        {
                          required: true,
                          minLength: 2,
                          maxLength: 160,
                        }
                      )}
                    >
                    </textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>

            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseButtonClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export { AddReviewModal };
