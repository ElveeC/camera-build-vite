import { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';

import { useAppSelector, useAppDispatch } from '../../hooks';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { BasketList } from '../../components/basket-list/basket-list';
import { BasketRemoveModal } from '../../components/basket-remove-modal/basket-remove-modal';

import { setCoupon, resetCouponStatus } from '../../store/product-data/product-data';
import { getSelectedProducts, getCouponStatus, getDiscount, getSavedCoupon, getCouponSendingStatus } from '../../store/product-data/product-data.selectors';
import { sendCouponAction } from '../../store/api-actions';

import { Status, INITIAL_TOTAL, PER_CENT } from '../../const';

function Basket () {

  const selectedProducts = useAppSelector(getSelectedProducts);
  const isCouponValid = useAppSelector(getCouponStatus);
  const discount = useAppSelector(getDiscount);
  const savedCoupon = useAppSelector(getSavedCoupon);
  const couponStatus = useAppSelector(getCouponSendingStatus);

  const [ couponValue, setCouponValue ] = useState(savedCoupon);

  const dispatch = useAppDispatch();


  let total = INITIAL_TOTAL;
  if (selectedProducts.length) {
    const prices = selectedProducts.map((product) => product.price);
    total = prices.reduce((a, b) => a + b);
  }

  const discountValue = Number((total * discount / PER_CENT).toFixed());
  const finalPrice = total - discountValue;

  const handleCouponClick = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetCouponStatus());
    const value = evt.target.value;
    setCouponValue(value);
  };

  const handleCouponSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendCouponAction({coupon: couponValue}));
    dispatch(setCoupon(couponValue));
  };


  return (
    <div className="wrapper">
      <Helmet>
        <title>Camera shop. Корзина</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <section className="basket" data-testid="basketElement">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList />
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#" onSubmit={handleCouponSubmit}>
                      <div
                        className={cn(
                          'custom-input',
                          {'is-valid': isCouponValid},
                          {'is-invalid': !isCouponValid && couponValue && couponStatus === Status.Error}
                        )}
                      >
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" value={couponValue} onChange={handleCouponClick}/>
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit" disabled={!couponValue || couponValue.includes(' ')}>Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{total} ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span>
                    <span
                      className={cn(
                        'basket__summary-value',
                        {'basket__summary-value--bonus': isCouponValid}
                      )}
                    >
                      {discountValue} ₽
                    </span>
                  </p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{finalPrice} ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <BasketRemoveModal />
      </main>
      <Footer />
    </div>
  );
}

export { Basket };
