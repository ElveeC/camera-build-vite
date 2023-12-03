import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { CategoryName, LevelFilter, TypeFilter, FilterOption } from '../../const';

type FilterProps = {
  minPrice: number | null;
  maxPrice: number | null;
}

function Filter ({ minPrice, maxPrice }: FilterProps) {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const category = searchParams.get(FilterOption.Category);
  const types = searchParams.getAll(FilterOption.Type);
  const levels = searchParams.getAll(FilterOption.Level);
  const priceMinParam = searchParams.get(FilterOption.PriceMin);
  const priceMaxParam = searchParams.get(FilterOption.PriceMax);

  const initialPriceMin = priceMinParam ? priceMinParam : '';
  const initialPriceMax = priceMaxParam ? priceMaxParam : '';
  const [ priceMinValue, setPriceMinValue ] = useState(initialPriceMin);
  const [ priceMaxValue, setPriceMaxValue ] = useState(initialPriceMax);

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputMinValue = evt.target.value;
    searchParams.set('page', '1');

    if (priceMaxParam && Number(inputMinValue) > Number(priceMaxParam)) {
      setPriceMinValue(priceMaxParam);
      searchParams.set(FilterOption.PriceMin, priceMaxParam);
    } else {
      setPriceMinValue(inputMinValue);
      searchParams.set(FilterOption.PriceMin, inputMinValue);
    }

    if (!evt.target.value) {
      searchParams.delete(FilterOption.PriceMin);
      setPriceMinValue('');
    }
    setSearchParams(searchParams);
  };

  const handleMinPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputMinValue = evt.target.value;
    if (minPrice && Number(inputMinValue) < minPrice) {
      setPriceMinValue(minPrice.toString());
      searchParams.set(FilterOption.PriceMin, minPrice.toString());
    }

    if (!evt.target.value) {
      searchParams.delete(FilterOption.PriceMin);
      setPriceMinValue('');
    }
    setSearchParams(searchParams);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    searchParams.set('page', '1');
    const inputMaxValue = evt.target.value;
    setPriceMaxValue(inputMaxValue);

    if (!evt.target.value) {
      searchParams.delete(FilterOption.PriceMax);
      setPriceMaxValue('');
    }
    setSearchParams(searchParams);
  };

  const handleMaxPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputMaxValue = evt.target.value;
    searchParams.set(FilterOption.PriceMax, inputMaxValue);
    if (maxPrice && Number(inputMaxValue) > maxPrice) {
      setPriceMaxValue(maxPrice.toString());
      searchParams.set(FilterOption.PriceMax, maxPrice.toString());
    }

    if (priceMinParam && Number(inputMaxValue) < Number(priceMinParam)) {
      setPriceMaxValue(priceMinParam);
      searchParams.set(FilterOption.PriceMax, priceMinParam);
    }
    if (!evt.target.value) {
      searchParams.delete(FilterOption.PriceMax);
      setPriceMaxValue('');
    }
    setSearchParams(searchParams);
  };

  const handlePhotoClick = () => {
    if (category === CategoryName.Photo) {
      searchParams.delete(FilterOption.Category);

    } else {
      searchParams.set('page', '1');
      searchParams.set(FilterOption.Category, CategoryName.Photo);
    }
    setSearchParams(searchParams);
  };

  const handleVideoClick = () => {
    if (category === CategoryName.Video) {
      searchParams.delete(FilterOption.Category);

    } else {
      searchParams.set('page', '1');
      searchParams.set(FilterOption.Category, CategoryName.Video);
      if (types) {
        const newTypes = types.filter((type) => type !== TypeFilter.Film && type !== TypeFilter.Snapshot);
        searchParams.delete(FilterOption.Type);
        newTypes.forEach((type) => searchParams.append(FilterOption.Type, type));
      }
    }
    setSearchParams(searchParams);
  };

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {

    if (types.includes(evt.target.value)) {
      const newTypes = types.filter((type) => type !== evt.target.value);
      searchParams.delete(FilterOption.Type);
      newTypes.forEach((type) => searchParams.append(FilterOption.Type, type));
    } else {
      searchParams.set('page', '1');
      searchParams.append(FilterOption.Type, evt.target.value);
    }
    setSearchParams(searchParams);
  };

  const handleLevelChange = (evt: ChangeEvent<HTMLInputElement>) => {

    if (levels.includes(evt.target.value)) {
      const newLevels = levels.filter((level) => level !== evt.target.value);
      searchParams.delete(FilterOption.Level);
      newLevels.forEach((level) => searchParams.append(FilterOption.Level, level));
    } else {
      searchParams.set('page', '1');
      searchParams.append(FilterOption.Level, evt.target.value);
    }
    setSearchParams(searchParams);
  };

  const handleResetClick = () => {
    setPriceMinValue('');
    setPriceMaxValue('');
    searchParams.set('page', '1');
    searchParams.delete(FilterOption.Category);
    searchParams.delete(FilterOption.Type);
    searchParams.delete(FilterOption.PriceMin);
    searchParams.delete(FilterOption.PriceMax);
    searchParams.delete(FilterOption.Level);
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
              <input type="checkbox" name="photocamera" checked={category === CategoryName.Photo} onChange={handlePhotoClick} data-testid='photoElement'/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="videocamera" checked={category === CategoryName.Video} onChange={handleVideoClick} data-testid='videoElement'/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" value={TypeFilter.Digital} checked={types.includes(TypeFilter.Digital)} onChange={handleTypeChange} data-testid='digitalElement'/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film" value={TypeFilter.Film} disabled={category === CategoryName.Video} checked={types.includes(TypeFilter.Film)} onChange={handleTypeChange} data-testid='filmElement'/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" value={TypeFilter.Snapshot} disabled={category === CategoryName.Video} checked={types.includes(TypeFilter.Snapshot)} onChange={handleTypeChange} data-testid='snapshotElement'/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" value={TypeFilter.Collection} checked={types.includes(TypeFilter.Collection)} onChange={handleTypeChange} data-testid='collectionElement'/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero" value={LevelFilter.Zero} checked={levels.includes(LevelFilter.Zero)} onChange={handleLevelChange} data-testid='zeroElement'/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="non-professional" value={LevelFilter.NonProfessional} checked={levels.includes(LevelFilter.NonProfessional)} onChange={handleLevelChange} data-testid='nonProfessionalElement'/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional" value={LevelFilter.Professional} checked={levels.includes(LevelFilter.Professional)} onChange={handleLevelChange} data-testid='professionalElement'/>
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
