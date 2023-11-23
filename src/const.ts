export const CARDS_PER_PAGE_NUMBER = 9;
export const BUTTONS_PER_PAGE_COUNT = 3;
export const REVIEWS_TO_SHOW_COUNT = 3;
export const PAGE_RADIX = 10;
export const MIN_SEARCH_SYMBOLS_COUNT = 3;

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

export enum SimilarProductsSliderData {
  Speed = 2000,
  SlidesPerGroup = 3,
  SlidesPerView = 3,
  SpaceBetween = 30
}

export enum InfoOption {
  Description = 'description',
  Specifications = 'specifications'
}

export enum Status {
  Unsent = 'unsent',
  Pending = 'pending',
  Success = 'success',
  Error = 'error'
}

export enum Category {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат'
}
