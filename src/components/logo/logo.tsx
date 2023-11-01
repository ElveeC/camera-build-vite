import { Link } from 'react-router-dom';

function Logo () {
  return (
    <Link className="header__logo" to="#" aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref="#icon-logo"></use>
      </svg>
    </Link>
  );
}

export { Logo };
