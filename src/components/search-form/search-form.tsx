import { useRef, useState, useEffect, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { getProducts } from '../../store/product-data/product-data.selectors';
import { useAppSelector } from '../../hooks';
import { ProductType } from '../../types/product-type';
import { MIN_SEARCH_SYMBOLS_COUNT, AppRoute } from '../../const';

function SearchForm () {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const resultsListRef = useRef<Array<HTMLLIElement | null>>([]);
  const products = useAppSelector(getProducts);
  const navigate = useNavigate();

  const [ results, setResults ] = useState<ProductType[]>([]);
  const [ searchText, setSearchText ] = useState('');
  const [ focusedProductIndex, setFocusedProductIndex ] = useState(-1);

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value);
    const searchResults = products.filter((product) => product.name.toLowerCase().includes(evt.currentTarget.value.toLocaleLowerCase()));
    setResults(searchResults);
  };

  const handleResetButtonClick = () => {
    setSearchText('');
    setResults([]);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const handleNameClick = (evt: MouseEvent<HTMLLIElement>) => {
    navigate(`${AppRoute.Product}/${evt.currentTarget.value}`);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      setFocusedProductIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      if (focusedProductIndex === 0) {
        if (searchRef.current) {
          searchRef.current.focus();
        }
        setFocusedProductIndex(-1);
      } else {
        setFocusedProductIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    } else if (evt.key === 'Enter' && focusedProductIndex !== -1) {
      const focusedProduct = results[focusedProductIndex];
      navigate(`${AppRoute.Product}/${focusedProduct.id}`);
    }
  };

  useEffect(() => {
    if (focusedProductIndex !== -1 && resultsListRef.current[focusedProductIndex]) {
      const focucedProduct = resultsListRef.current[focusedProductIndex];
      if (focucedProduct) {
        focucedProduct.focus();
      }
    }
  }, [focusedProductIndex]);

  return (
    <div className={cn(
      'form-search',
      {'list-opened': searchText.length }
    )}
    >
      <FocusLock ref={focusRef} returnFocus disabled={!results.length || !searchText}>
        <>
          <form data-testid="searchFormElement" onKeyDown={handleKeyDown}>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input className="form-search__input" ref={searchRef} onChange={handleSearchInput} type="text" autoComplete="off" placeholder="Поиск по сайту" />
            </label>
            {
              results.length !== 0 && searchText.length >= MIN_SEARCH_SYMBOLS_COUNT &&
            <ul className="form-search__select-list scroller">
              {results.map((result, index) => (
                <li
                  className="form-search__select-item"
                  key={result.id}
                  value={result.id}
                  onClick={handleNameClick}
                  onFocus={() => setFocusedProductIndex(index)}
                  ref={(focucedProduct) => (resultsListRef.current[index] = focucedProduct)}
                  tabIndex={0}
                >
                  {result.name}
                </li>))}
            </ul>
            }
          </form>
          <button className="form-search__reset" type="reset" onClick={handleResetButtonClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </>
      </FocusLock>
    </div>
  );
}

export { SearchForm };
