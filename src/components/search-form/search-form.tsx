import { useRef, useState, ChangeEvent, MouseEvent } from 'react';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';
import { getProducts } from '../../store/product-data/product-data.selectors';
import { useAppSelector } from '../../hooks';
import { ProductType } from '../../types/product-type';
import { MIN_SEARCH_SYMBOLS_COUNT, AppRoute } from '../../const';

function SearchForm () {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const products = useAppSelector(getProducts);
  const navigate = useNavigate();

  const [ results, setResults ] = useState<ProductType[]>([]);
  const [ searchText, setSearchText ] = useState('');

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

  return (
    <div className={cn(
      'form-search',
      {'list-opened': results.length && searchText.length >= MIN_SEARCH_SYMBOLS_COUNT}
    )}
    >
      <form data-testid="searchFormElement">
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" ref={searchRef} onChange={handleSearchInput} type="text" autoComplete="off" placeholder="Поиск по сайту" />
        </label>
        {
          results.length !== 0 &&
          <ul className="form-search__select-list scroller">
            {results.map((result) => (<li key={result.id} className="form-search__select-item" value={result.id} onClick={handleNameClick} tabIndex={0}>{result.name}</li>))}
          </ul>
        }

      </form>

      <button className="form-search__reset" type="reset" onClick={handleResetButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>

    </div>
  );
}

export { SearchForm };
