import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useRef, useCallback, MouseEvent, useState } from 'react';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';
import { getReviewPostingStatus, getAddReviewActiveStatus } from '../../store/reviews-data/reviews-data.selectors';
import { setAddReviewActive } from '../../store/reviews-data/reviews-data';
import { Status } from '../../const';


type AddReviewModalProps = {
  cameraId: number;
}

type AddReviewFormValues = {
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

function AddReviewModal ({ cameraId }: AddReviewModalProps) {
  const dispatch = useAppDispatch();
  const reviewPostingStatus = useAppSelector(getReviewPostingStatus);
  const isModalActive = useAppSelector(getAddReviewActiveStatus);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const [ starsCount, setStarsCount ] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm<AddReviewFormValues>();

  const onSubmit: SubmitHandler<AddReviewFormValues> = ({ userName, advantage, disadvantage, review, rating }) => {

    dispatch(addReviewAction({
      cameraId: cameraId,
      userName: userName,
      advantage: advantage,
      disadvantage: disadvantage,
      review: review,
      rating: Number(rating)
    }));

  };

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(setAddReviewActive(false));
      document.body.style.overflow = 'unset';
    }
  }, [dispatch]);

  const handleCloseButtonClick = () => {
    dispatch(setAddReviewActive(false));
    document.body.style.overflow = 'unset';
  };

  const handleOverlayClick = () => {
    dispatch(setAddReviewActive(false));
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (reviewPostingStatus === Status.Success) {
        dispatch(setAddReviewActive(false));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, reviewPostingStatus]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (isModalActive && focusRef.current) {
        focusRef.current.focus();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKeydown);
      }
      return () => {
        document.removeEventListener('keydown', handleEscapeKeydown);
      };
    }
    return () => {
      isMounted = false;
    };
  }, [isModalActive, handleEscapeKeydown]);


  const handleStarClick = (evt: MouseEvent<HTMLInputElement>) => {
    setStarsCount(Number(evt.currentTarget.value));
  };


  return (
    <div className='modal is-active'>

      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <FocusLock ref={focusRef} returnFocus>
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
                      <div className="rate__group" >
                        <input className="visually-hidden" onClick={handleStarClick} id="star-5" type="radio" value={5} {...register('rating', {required: true})} data-testid='starElement'/>
                        <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                        <input className="visually-hidden" onClick={handleStarClick} id="star-4" type="radio" value={4} {...register('rating', {required: true})} data-testid='starElement'/>
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                        <input className="visually-hidden" onClick={handleStarClick} id="star-3" type="radio" value={3} {...register('rating', {required: true})} data-testid='starElement'/>
                        <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                        <input className="visually-hidden" onClick={handleStarClick} id="star-2" type="radio" value={2} {...register('rating', {required: true})} data-testid='starElement'/>
                        <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                        <input className="visually-hidden" onClick={handleStarClick} id="star-1" type="radio" value={1} {...register('rating', {required: true})} data-testid='starElement'/>
                        <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                      </div>
                      <div className="rate__progress"><span className="rate__stars">{starsCount}</span> <span>/</span> <span className="rate__all-stars">5</span>
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
                        data-testid="nameElement"
                        data-autofocus
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
                        data-testid="advantageElement"
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
                        data-testid="disadvantageElement"
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
                        data-testid="reviewTextElement"
                      >
                      </textarea>
                    </label>
                    <div className="custom-textarea__error">Нужно добавить комментарий</div>
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit" data-testid="submitElement" >Отправить отзыв</button>

              </form>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </FocusLock>
      </div>
    </div>
  );
}

export { AddReviewModal };
