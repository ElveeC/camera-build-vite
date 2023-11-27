import { useSearchParams } from 'react-router-dom';
//import { useState } from 'react';
//import { useAppSelector, useAppDispatch } from '../../hooks';
//import { setPhotoCheckedStatus, setVideoCheckedStatus } from '../../store/product-data/product-data';
//import { getPhotoCheckedStatus, getVideoCheckedStatus } from '../../store/product-data/product-data.selectors';
import { CategoryOption, /*CameraTypeOption,*/ CameraType } from '../../const';
import { ChangeEvent } from 'react';

function Filter () {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const category = searchParams.get('category');
  const types = searchParams.getAll('type');

  const handlePhotoClick = () => {
    if (category === CategoryOption.Photo) {
      searchParams.delete('category');

    } else {
      searchParams.set('page', '1');
      searchParams.set('category', CategoryOption.Photo);
    }
    setSearchParams(searchParams);
  };

  const handleVideoClick = () => {
    if (category === CategoryOption.Video) {
      searchParams.delete('category');
    } else {
      searchParams.set('page', '1');
      searchParams.set('category', CategoryOption.Video);
    }
    setSearchParams(searchParams);
  };

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (types.includes(evt.target.value)) {
      searchParams.delete('type', evt.target.value);
    } else {
      searchParams.set('page', '1');
      searchParams.append('type', evt.target.value);
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
              <input type="checkbox" name="photocamera" checked={category === CategoryOption.Photo} onChange={handlePhotoClick}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="videocamera" checked={category === CategoryOption.Video} onChange={handleVideoClick}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" value={CameraType.Digital} checked={types.includes(CameraType.Digital)} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film" value={CameraType.Film} disabled={category === CategoryOption.Video} checked={types.includes(CameraType.Film)} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" value={CameraType.Snapshot} disabled={category === CategoryOption.Video} checked={types.includes(CameraType.Snapshot)} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" value={CameraType.Collection} checked={types.includes(CameraType.Collection)} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero" />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="non-professional" />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional" />
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
