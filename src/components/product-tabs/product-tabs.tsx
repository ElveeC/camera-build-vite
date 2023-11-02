import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

import { ProductType } from '../../types/product-type';
import { InfoOption } from '../../const';


type ProductTabsProps = {
  product: ProductType;
}

function ProductTabs ({ product }: ProductTabsProps) {
  const { vendorCode, category, type, level, description } = product;

  const [ searchParams, setSearchParams ] = useSearchParams();
  const info = searchParams.get('info');

  const [ infoOption, setInfoOption ] = useState(() => {
    switch (info) {

      case InfoOption.Description:
        return InfoOption.Description;

      case InfoOption.Specifications:
        return InfoOption.Specifications;

      default:
        return InfoOption.Description;
    }
  });

  const isDescriptionActive = infoOption === InfoOption.Description;
  const isSpecificationActive = infoOption === InfoOption.Specifications;

  const handleSpecificationsButtonClick = () => {
    setInfoOption(InfoOption.Specifications);
    setSearchParams({ info: InfoOption.Specifications});
  };

  const handleDescriptionButtonClick = () => {
    setInfoOption(InfoOption.Description);
    setSearchParams({ info: InfoOption.Description});
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className = {cn(
            'tabs__control',
            { 'is-active': isSpecificationActive}
          )}
          type="button"
          onClick={handleSpecificationsButtonClick}
        >Характеристики
        </button>
        <button
          className = {cn(
            'tabs__control',
            { 'is-active': isDescriptionActive}
          )}
          type="button" onClick={handleDescriptionButtonClick}
        >Описание
        </button>
      </div>
      <div className="tabs__content">
        <div
          className = {cn(
            'tabs__element',
            { 'is-active': isSpecificationActive}
          )}
        >
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div
          className = {cn(
            'tabs__element',
            { 'is-active': isDescriptionActive}
          )}
        >
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductTabs };
