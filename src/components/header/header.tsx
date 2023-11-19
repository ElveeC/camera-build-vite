import { Link } from 'react-router-dom';
import { Logo } from '../logo/logo';
import { SearchForm } from '../search-form/search-form';

import { AppRoute } from '../../const';

function Header () {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export { Header };
