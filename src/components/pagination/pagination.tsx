import { Link } from 'react-router-dom';
import cn from 'classnames';
import { BUTTONS_PER_PAGE_COUNT } from '../../const';
import { calculateFirstPageInSlice, calculateButtonsToShowCount, calculateCurrentSliceNumber } from '../../utils';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
}

function Pagination ({currentPage, pageCount}: PaginationProps) {

  const firstPageInSlice = calculateFirstPageInSlice(currentPage, BUTTONS_PER_PAGE_COUNT);
  const sliceCount = Math.ceil(pageCount / BUTTONS_PER_PAGE_COUNT);

  const handleNextButtonClick = () => {
    currentPage = currentPage + 1;
    //dispatch(setCurrentPage(currentPage));
  };

  const handleBackButtonClick = () => {
    currentPage = currentPage - 1;
  };

  /*const showNextButton = (totalPagesCount: number, buttonPerPageCount: number, activePage: number) => {
    switch (totalPagesCount % buttonPerPageCount) {
      case 0:
        if (activePage < totalPagesCount - 2) {
          return true;
        }
        break;
      case 1:
        if (activePage < totalPagesCount) {
          return true;
        }
        break;
      case 2:
        if (activePage < totalPagesCount - 1) {
          return true;
        }
        break;
      default:
        return false;
    }
  };

  const isNextButton = showNextButton(pageCount, BUTTONS_PER_PAGE_COUNT, currentPage);*/

  const currentSliceNumber = calculateCurrentSliceNumber(currentPage, BUTTONS_PER_PAGE_COUNT);

  const buttonsToShowCount = calculateButtonsToShowCount(currentSliceNumber, sliceCount, pageCount, BUTTONS_PER_PAGE_COUNT);

  const buttons = Array.from({length: buttonsToShowCount}, () => '');

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > BUTTONS_PER_PAGE_COUNT &&
        <li className="pagination__item" data-testid="backElement">
          <Link className="pagination__link pagination__link--text" onClick={handleBackButtonClick} to={`catalog/${currentPage - 1}`}>Назад</Link>
        </li>}


        {buttons.map((button, index) => (
          <li className="pagination__item" key={`${button}${firstPageInSlice + index}`} data-testid="pageButtonElement">
            <Link className={cn(
              'pagination__link',
              { 'pagination__link--active': firstPageInSlice + index === currentPage}
            )}
            to={`catalog/${firstPageInSlice + index}`}
            >
              {firstPageInSlice + index}
            </Link>
          </li>
        ))}

        {
          currentSliceNumber < sliceCount
          &&
          // isNextButton
          (
            <li className="pagination__item" data-testid="nextElement">
              <Link className="pagination__link pagination__link--text" onClick={handleNextButtonClick} to={`catalog/${currentPage + 1}`}>Далее</Link>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export { Pagination };
