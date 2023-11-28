import { useSearchParams } from 'react-router-dom';
//import { useState } from 'react';
//import { useAppSelector, useAppDispatch } from '../../hooks';
//import { setPhotoCheckedStatus, setVideoCheckedStatus } from '../../store/product-data/product-data';
//import { getPhotoCheckedStatus, getVideoCheckedStatus } from '../../store/product-data/product-data.selectors';
import { CategoryName, LevelFilter, /*CameraTypeOption,*/ TypeFilter } from '../../const';
import { ChangeEvent } from 'react';

function Filter () {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const category = searchParams.get('category');
  const types = searchParams.getAll('type');
  const levels = searchParams.getAll('level');

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

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" />
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
        <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export { Filter };
