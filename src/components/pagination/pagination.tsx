import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute, BUTTONS_PER_PAGE_COUNT } from '../../const';
import { calculateFirstPageInSlice, calculateButtonsToShowCount, calculateCurrentSliceNumber } from '../../utils';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
}

function Pagination ({currentPage, pageCount}: PaginationProps) {

  const [ searchParams, setSearchParams ] = useSearchParams();
  const firstPageInSlice = calculateFirstPageInSlice(currentPage, BUTTONS_PER_PAGE_COUNT);
  const sliceCount = Math.ceil(pageCount / BUTTONS_PER_PAGE_COUNT);


  const handleNextButtonClick = () => {
    currentPage = currentPage + 1;
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
  };

  const handleBackButtonClick = () => {
    currentPage = currentPage - 1;
    setSearchParams({page: currentPage.toString()});
  };

  const currentSliceNumber = calculateCurrentSliceNumber(currentPage, BUTTONS_PER_PAGE_COUNT);

  const buttonsToShowCount = calculateButtonsToShowCount(currentSliceNumber, sliceCount, pageCount, BUTTONS_PER_PAGE_COUNT);

  const buttons = Array.from({length: buttonsToShowCount}, () => '');

  const createSearchURL = (newCurrentPage: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', newCurrentPage.toString());
    return newParams.toString();
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > BUTTONS_PER_PAGE_COUNT &&
        <li className="pagination__item" data-testid="backElement">
          <Link className="pagination__link pagination__link--text" onClick={handleBackButtonClick} to={{
            pathname: AppRoute.Catalog,
            search: `?${createSearchURL(currentPage - 1)}`
          }}
          >Назад
          </Link>
        </li>}


        {buttons.map((button, index) => (
          <li className="pagination__item" key={`${button}${firstPageInSlice + index}`} data-testid="pageButtonElement">
            <Link className={cn(
              'pagination__link',
              { 'pagination__link--active': firstPageInSlice + index === currentPage}
            )}
            id={`${firstPageInSlice + index}`}
            to={{
              pathname: AppRoute.Catalog,
              search: `?${createSearchURL(firstPageInSlice + index)}`
            }}
            onClick={() => {
              currentPage = firstPageInSlice + index;
              setSearchParams({page: currentPage.toString()});
            }}
            >
              {firstPageInSlice + index}
            </Link>
          </li>
        ))}

        {
          currentSliceNumber < sliceCount
          &&
          (
            <li className="pagination__item" data-testid="nextElement">
              <Link className="pagination__link pagination__link--text" onClick={handleNextButtonClick} to={{
                pathname: AppRoute.Catalog,
                search: `?${createSearchURL(currentPage + 1)}`
              }}
              >Далее
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export { Pagination };
