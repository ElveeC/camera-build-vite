export enum AppRoute {
  Catalog = '/',
  Product = '/product',
  Basket = '/basket',
  NotFound = '/not-found'
}

export enum APIRoute {
  Products = '/cameras',
  Similar = '/similar',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Order = '/orders'
}

export enum NameSpace {
  Data = 'DATA',
  Similar = 'SIMILAR',
  Reviews = 'REVIEWS',
  Promo = 'PROMO',
}

export enum BannerSliderData {
  Speed = 700,
  AutoPlayDelay = 3000,
  SlidesPerView = 1
}

export const CARDS_PER_PAGE_NUMBER = 9;
export const BUTTONS_PER_PAGE_COUNT = 3;

export enum SimilarProductsSliderData {
  Speed = 2000,
  SlidesPerGroup = 3,
  SlidesPerView = 3,
  SpaceBetween = 30
}
