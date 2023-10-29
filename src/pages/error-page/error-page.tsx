import { useAppDispatch } from '../../hooks';
import { fetchProductsAction } from '../../store/api-actions';
import styles from './error-page.module.css';

function ErrorPage () {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <section className={styles.error}>
        <p className={styles['error__text']}>Ошибка загрузки</p>
        <p></p>
        <button
          onClick={() => {
            dispatch(fetchProductsAction());
          }}
          className={styles['error__button']}
        >Попробуйте ещё раз
        </button>
      </section>
    </div>
  );
}

export { ErrorPage };
