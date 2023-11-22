import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSortByPriceStatus, getSortByPopularityStatus, getMaxToMinSortStatus, getMinToMaxSortStatus } from '../../store/product-data/product-data.selectors';
import { setSortByPriceStatus, setSortByPopularityStatus, setMaxToMinSortStatus, setMinToMaxSortStatus } from '../../store/product-data/product-data';

function Sorting () {
  const dispatch = useAppDispatch();

  const isPriceChecked = useAppSelector(getSortByPriceStatus);
  const isPopularChecked = useAppSelector(getSortByPopularityStatus);
  const isMinToMax = useAppSelector(getMinToMaxSortStatus);
  const isMaxToMin = useAppSelector(getMaxToMinSortStatus);

  const handlePriceClick = () => {
    dispatch(setSortByPriceStatus(true));
    dispatch(setSortByPopularityStatus(false));
    if (!isMaxToMin && !isMinToMax) {
      dispatch(setMaxToMinSortStatus(true));
    }
  };

  const handlePopularClick = () => {
    dispatch(setSortByPopularityStatus(true));
    dispatch(setSortByPriceStatus(false));
    if (!isMaxToMin && !isMinToMax) {
      dispatch(setMaxToMinSortStatus(true));
    }
  };

  const handleMinToMaxClick = () => {
    dispatch(setMinToMaxSortStatus(true));
    dispatch(setMaxToMinSortStatus(false));
    if (!isPriceChecked && !isPopularChecked) {
      dispatch(setSortByPriceStatus(true));
    }
  };

  const handleMaxToMinClick = () => {
    dispatch(setMinToMaxSortStatus(false));
    dispatch(setMaxToMinSortStatus(true));
    if (!isPriceChecked && !isPopularChecked) {
      dispatch(setSortByPriceStatus(true));
    }
  };


  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" checked={isPriceChecked} onChange={handlePriceClick}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={isPopularChecked} onChange={handlePopularClick}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={isMinToMax} onChange={handleMinToMaxClick}/>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={isMaxToMin} onChange={handleMaxToMinClick}/>
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export { Sorting };
