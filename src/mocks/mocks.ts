import { system, datatype, random, name, date } from 'faker';
import { ProductType } from '../types/product-type';
import { PromoType } from '../types/product-type';
import { ReviewType/*, PostingReviewType*/ } from '../types/review-type';

export const makeFakeProduct = (): ProductType => ({
  id: datatype.number(),
  name: random.word(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
  vendorCode: random.word(),
  type: random.word(),
  category: random.word(),
  description: random.word(),
  level: random.word(),
  price: datatype.number(),
  rating: datatype.number(5),
  reviewCount: datatype.number(100),
});

export const makeFakeProducts = (): ProductType[] => Array.from({ length: 15 }, makeFakeProduct);

export const makeFakePromos = () : PromoType[] => (
  new Array(3).fill(null).map(() => (
    {
      id: datatype.number(),
      name: name.firstName(),
      previewImg: system.filePath(),
      previewImg2x: system.filePath(),
      previewImgWebp: system.filePath(),
      previewImgWebp2x: system.filePath()
    }
  ))
);

export const makeFakeReview = (): ReviewType => ({
  cameraId:  datatype.number(),
  userName: name.firstName(),
  advantage: random.word(),
  disadvantage: random.word(),
  review: random.word(),
  rating: datatype.number(5),
  id: datatype.uuid(),
  createAt: date.past().toISOString()
});

export const makeFakeReviews = (): ReviewType[] => Array.from({ length: 10 }, makeFakeReview);

export const makeFakeSimilarProducts = (): ProductType[] => Array.from({length: 15}, makeFakeProduct);
