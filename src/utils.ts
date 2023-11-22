import { ProductType } from './types/product-type';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

export const calculateFirstPageInSlice = (currentPage: number, buttonsPerPageCount: number) => {
  let firstPageInSlice = 1;
  if (currentPage > buttonsPerPageCount) {
    switch (currentPage % buttonsPerPageCount) {
      case 0:
        firstPageInSlice = currentPage - 2;
        break;
      case 1:
        firstPageInSlice = currentPage;
        break;
      case 2:
        firstPageInSlice = currentPage - 1;
        break;
    }
  }

  return firstPageInSlice;
};

export const calculateButtonsToShowCount = (currentSliceNumber: number, sliceCount: number, pageCount: number, buttonsPerPageCount: number) => {

  let buttonsToShowCount = buttonsPerPageCount;
  if (currentSliceNumber === sliceCount && pageCount % buttonsPerPageCount) {
    buttonsToShowCount = pageCount % buttonsPerPageCount;
  }
  return buttonsToShowCount;
};

export const calculateCurrentSliceNumber = (currentPage: number, buttonsPerPageCount: number) => {
  let currentSliceNumber = currentPage / buttonsPerPageCount;
  if (currentPage < buttonsPerPageCount || currentPage % buttonsPerPageCount) {
    currentSliceNumber = Math.floor(currentPage / buttonsPerPageCount) + 1;
  }
  return currentSliceNumber;
};

const DateFormat = {
  DMMMM: 'D MMMM',
};
export const humanizeDate = (date: string) => date ? dayjs(date).format(DateFormat.DMMMM) : '';

const TOTAL_STARS_COUNT = 5;
export const createFullStarsArray = (rating: number) => Array.from({ length: rating}, () => '');
export const createStarsArray = (rating: number) => Array.from({ length: TOTAL_STARS_COUNT - rating}, () => '');

export const sortByPriceMintoMax = (products: ProductType[]) => products.sort((a, b) => a.price - b.price);
export const sortByPriceMaxtoMin = (products: ProductType[]) => products.sort((a, b) => b.price - a.price);
export const sortMostPopularFirst = (products: ProductType[]) => products.sort((a, b) => b.rating - a.rating);
export const sortLessPopularFirst = (products: ProductType[]) => products.sort((a, b) => a.rating - b.rating);
