export const CARDS_PER_PAGE_NUMBER = 9;
export const BUTTONS_PER_PAGE_COUNT = 3;
export const REVIEWS_TO_SHOW_COUNT = 3;
export const PAGE_RADIX = 10;
export const MIN_SEARCH_SYMBOLS_COUNT = 3;
export const INITIAL_TOTAL = 0;
export const PER_CENT = 100;
export const REGEX_INVALID_QUANTITY = /\D/g;

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

export enum CategoryFilter {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат'
}

export enum CategoryName {
  Video = 'video',
  Photo = 'photo'
}

export enum TypeFilter {
  Digital = 'Цифровая',
  Film ='Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная'
}

export enum LevelFilter {
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный'
}

export enum FilterOption {
  Category = 'category',
  Type = 'type',
  Level = 'level',
  PriceMin = 'price_min',
  PriceMax = 'price_max'
}

export enum SortOption {
  Price = 'price',
  Popular = 'popular'
}

export enum SortOrder {
  MinToMax = 'min_to_max',
  MaxToMin = 'max_to_min'
}

export enum SortType {
  Sort = 'sort',
  Order = 'order'
}

export enum ProductQuantity {
  MinQuantity = 1,
  MaxQuantity = 99,
}

export enum LocalStorage {
  SelectedProducts = 'selectedProducts',
  UniqueBasketProducts = 'uniqueBasketProducts',
}
