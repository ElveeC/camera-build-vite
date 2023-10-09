import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
//import { ProductType } from '../../types/product-type';

type BreadcrumbsProps = {
 currentPage?: AppRoute;
 //productName?: Pick<ProductType, 'name'>;
 productName?: string;
}


function Breadcrumbs ({ currentPage, productName }: BreadcrumbsProps) {

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="index.html">Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
          </li>
          {
            currentPage === AppRoute.Product
            &&
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">{productName}</span>
              </li>
          }
        </ul>
      </div>
    </div>
  );
}

export { Breadcrumbs };
