import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { CategoryName, LevelFilter, /*CameraTypeOption,*/ TypeFilter } from '../../const';

//import { setMinPriceValue } from '../../store/product-data/product-data';
//import { getMinPriceValue } from '../../store/product-data/product-data.selectors';

type FilterProps = {
  minPrice: number | null;
  maxPrice: number | null;
}

function Filter ({ minPrice, maxPrice }: FilterProps) {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const category = searchParams.get('category');
  const types = searchParams.getAll('type');
  const levels = searchParams.getAll('level');
  const priceMinParam = searchParams.get('price_min');
  const priceMaxParam = searchParams.get('price_max');

  const initialPriceMin = priceMinParam ? priceMinParam : '';
  const initialPriceMax = priceMaxParam ? priceMaxParam : '';
  const [ priceMinValue, setPriceMinValue ] = useState(initialPriceMin);

  //const priceMinValue = useAppSelector(getMinPriceValue);
  //const dispatch = useAppDispatch();

  const [ priceMaxValue, setPriceMaxValue ] = useState(initialPriceMax);

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputMinValue = evt.target.value;
    searchParams.set('page', '1');

    if (priceMaxParam && Number(inputMinValue) > Number(priceMaxParam)) {
      setPriceMinValue(priceMaxParam);
      //dispatch(setMinPriceValue(Number(priceMaxParam)));
      searchParams.set('price_min', priceMaxParam);
    } else {
      //dispatch(setMinPriceValue(Number(inputMinValue)));
      setPriceMinValue(inputMinValue);
      searchParams.set('price_min', inputMinValue);
    }

    if (!evt.target.value) {
      searchParams.delete('price_min');
      setPriceMinValue('');
    }
    setSearchParams(searchParams);
  };

  const handleMinPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputMinValue = evt.target.value;
    //searchParams.set('price_min', inputMinValue);
    if (minPrice && Number(inputMinValue) < minPrice) {
      setPriceMinValue(minPrice.toString());
      //dispatch(setMinPriceValue(minPrice));
      searchParams.set('price_min', minPrice.toString());
    }
    /*if (priceMaxParam && Number(inputMinValue) > Number(priceMaxParam)) {
      setPriceMinValue(priceMaxParam);
      searchParams.set('price_min', priceMaxParam);
    }*/
    /*if (priceMaxValue && Number(inputMinValue) > Number(priceMaxValue)) {
      //dispatch(setMinPriceValue(Number(priceMaxValue)));
      searchParams.set('price_min', priceMaxValue);
      setPriceMinValue(priceMaxValue);
    }*/

    if (!evt.target.value) {
      searchParams.delete('price_min');
      setPriceMinValue('');
      // dispatch(setMinPriceValue(undefined));
    }
    setSearchParams(searchParams);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    searchParams.set('page', '1');
    const inputMaxValue = evt.target.value;
    //searchParams.set('price_max', inputMaxValue);
    setPriceMaxValue(inputMaxValue);

    if (!evt.target.value) {
      searchParams.delete('price_max');
      setPriceMaxValue('');
    }
    setSearchParams(searchParams);
  };

  const handleMaxPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputMaxValue = evt.target.value;
    searchParams.set('price_max', inputMaxValue);
    if (maxPrice && Number(inputMaxValue) > maxPrice) {
      setPriceMaxValue(maxPrice.toString());
      searchParams.set('price_max', maxPrice.toString());
    }

    if (priceMinParam && Number(inputMaxValue) < Number(priceMinParam)) {
      setPriceMaxValue(priceMinParam);
      searchParams.set('price_max', priceMinParam);
    }
    if (!evt.target.value) {
      searchParams.delete('price_max');
      setPriceMaxValue('');
    }
    setSearchParams(searchParams);
  };

  const handlePhotoClick = () => {
    if (category === CategoryName.Photo) {
      searchParams.delete('category');

    } else {
      searchParams.set('page', '1');
      searchParams.set('category', CategoryName.Photo);
    }
    setSearchParams(searchParams);
  };

  const handleVideoClick = () => {
    if (category === CategoryName.Video) {
      searchParams.delete('category');

    } else {
      searchParams.set('page', '1');
      searchParams.set('category', CategoryName.Video);
      if (types) {
        const newTypes = types.filter((type) => type !== TypeFilter.Film && type !== TypeFilter.Snapshot);
        searchParams.delete('type');
        newTypes.forEach((type) => searchParams.append('type', type));
      }
    }
    setSearchParams(searchParams);
  };

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {

    if (types.includes(evt.target.value)) {
      const newTypes = types.filter((type) => type !== evt.target.value);
      searchParams.delete('type');
      //searchParams.delete('type', evt.target.value);
      newTypes.forEach((type) => searchParams.append('type', type));
    } else {
      searchParams.set('page', '1');
      searchParams.append('type', evt.target.value);
    }
    setSearchParams(searchParams);
  };

  const handleLevelChange = (evt: ChangeEvent<HTMLInputElement>) => {

    if (levels.includes(evt.target.value)) {
      const newLevels = levels.filter((level) => level !== evt.target.value);
      searchParams.delete('level');
      newLevels.forEach((level) => searchParams.append('level', level));
    } else {
      searchParams.set('page', '1');
      searchParams.append('level', evt.target.value);
    }
    setSearchParams(searchParams);
  };

  const handleResetClick = () => {
    setPriceMinValue('');
    setPriceMaxValue('');
    searchParams.set('page', '1');
    searchParams.delete('category');
    searchParams.delete('type');
    searchParams.delete('price_min');
    searchParams.delete('price_max');
    searchParams.delete('level');
    setSearchParams(searchParams);
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder={minPrice ? minPrice.toString() : 'от'} onChange={handleMinPriceChange} onBlur={handleMinPriceBlur} value={priceMinValue}/>
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder={maxPrice ? maxPrice.toString() : 'до'} onChange={handleMaxPriceChange} onBlur={handleMaxPriceBlur} value={priceMaxValue}/>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="photocamera" checked={category === CategoryName.Photo} onChange={handlePhotoClick}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="videocamera" checked={category === CategoryName.Video} onChange={handleVideoClick}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" value={TypeFilter.Digital} checked={types.includes(TypeFilter.Digital)} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film" value={TypeFilter.Film} disabled={category === CategoryName.Video} checked={types.includes(TypeFilter.Film)} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" value={TypeFilter.Snapshot} disabled={category === CategoryName.Video} checked={types.includes(TypeFilter.Snapshot)} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" value={TypeFilter.Collection} checked={types.includes(TypeFilter.Collection)} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero" value={LevelFilter.Zero} checked={levels.includes(LevelFilter.Zero)} onChange={handleLevelChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="non-professional" value={LevelFilter.NonProfessional} checked={levels.includes(LevelFilter.NonProfessional)} onChange={handleLevelChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional" value={LevelFilter.Professional} checked={levels.includes(LevelFilter.Professional)} onChange={handleLevelChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleResetClick}>Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export { Filter };
