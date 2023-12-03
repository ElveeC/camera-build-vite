import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortOption, SortType, SortOrder } from '../../const';

function Sorting () {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const order = searchParams.get(SortType.Order);
  const sort = searchParams.get(SortType.Sort);
  const [ isMinToMax, setMinToMax ] = useState(false);
  const [ isMaxToMin, setMaxToMin ] = useState(false);
  const [ isPriceChecked, setPriceChecked ] = useState(false);
  const [ isPopularChecked, setPopularChecked ] = useState(false);

  const handlePriceClick = () => {
    setPriceChecked(true);
    setPopularChecked(false);
    searchParams.set('page', '1');
    searchParams.set(SortType.Sort, SortOption.Price);
    if (!isMaxToMin && !isMinToMax) {
      setMaxToMin(true);
      searchParams.set(SortType.Order, SortOrder.MaxToMin);
    }
    setSearchParams(searchParams);
  };

  const handlePopularClick = () => {
    setPopularChecked(true);
    setPriceChecked(false);
    searchParams.set('page', '1');
    searchParams.set(SortType.Sort, SortOption.Popular);
    if (!isMaxToMin && !isMinToMax) {
      setMaxToMin(true);
      searchParams.set(SortType.Order, SortOrder.MaxToMin);
    }
    setSearchParams(searchParams);
  };

  const handleMinToMaxClick = () => {
    setMinToMax(true);
    setMaxToMin(false);
    searchParams.set('page', '1');
    searchParams.set(SortType.Order, SortOrder.MinToMax);
    if (!isPriceChecked && !isPopularChecked) {
      setPriceChecked(true);
      searchParams.set(SortType.Sort, SortOption.Price);
    }
    setSearchParams(searchParams);
  };

  const handleMaxToMinClick = () => {
    setMaxToMin(true);
    setMinToMax(false);
    searchParams.set('page', '1');
    searchParams.set(SortType.Order, SortOrder.MaxToMin);
    if (!isPriceChecked && !isPopularChecked) {
      setPriceChecked(true);
      searchParams.set(SortType.Sort, SortOption.Price);
    }
    setSearchParams(searchParams);
  };


  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" checked={sort === SortOption.Price} onChange={handlePriceClick}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={sort === SortOption.Popular} onChange={handlePopularClick}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={order === SortOrder.MinToMax} onChange={handleMinToMaxClick}/>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={order === SortOrder.MaxToMin} onChange={handleMaxToMinClick}/>
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
