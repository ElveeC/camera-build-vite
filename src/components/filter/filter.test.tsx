import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { Filter } from './filter';

describe('Component: Filter', () => {

  it('should render correctly with filters unchecked', () => {
    const expectedFilterText = 'Фильтр';
    const expectedPriceText = 'Цена, ₽';
    const expectedCategoryText = 'Категория';
    const expectedCameraText = 'Фотокамера';
    const expectedVideoCameraText = 'Видеокамера';
    const expectedTypeText = 'Тип камеры';
    const expectedDigitalText = 'Цифровая';
    const expectedFilmText = 'Плёночная';
    const expectedSnapShotText = 'Моментальная';
    const expectedCollectionText = 'Коллекционная';
    const expectedLevelText = 'Уровень';
    const expectedZeroLevelText = 'Нулевой';
    const expectedNonProfessionalText = 'Любительский';
    const expectedProfessionalText = 'Профессиональный';
    const expectedFromPlaceholderText = 'от';
    const expectedToPlaceholderText = 'до';
    const expectedResetText = 'Сбросить фильтры';
    const photoElement = 'photoElement';
    const videoElement = 'videoElement';
    const digitalElement = 'digitalElement';
    const filmElement = 'filmElement';
    const snapshotElement = 'snapshotElement';
    const collectionElement = 'collectionElement';
    const zeroElement = 'zeroElement';
    const nonProfessionalElement = 'nonProfessionalElement';
    const professionalElement = 'professionalElement';

    const { withStoreComponent } = withStore(<Filter minPrice={null} maxPrice={null}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedFilterText)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedFromPlaceholderText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedToPlaceholderText)).toBeInTheDocument();
    expect(screen.getByText(expectedCategoryText)).toBeInTheDocument();
    expect(screen.getByText(expectedCameraText)).toBeInTheDocument();
    expect(screen.getByText(expectedVideoCameraText)).toBeInTheDocument();
    expect(screen.getByText(expectedTypeText)).toBeInTheDocument();
    expect(screen.getByText(expectedDigitalText)).toBeInTheDocument();
    expect(screen.getByText(expectedFilmText)).toBeInTheDocument();
    expect(screen.getByText(expectedSnapShotText)).toBeInTheDocument();
    expect(screen.getByText(expectedCollectionText)).toBeInTheDocument();
    expect(screen.getByText(expectedLevelText)).toBeInTheDocument();
    expect(screen.getByText(expectedZeroLevelText)).toBeInTheDocument();
    expect(screen.getByText(expectedNonProfessionalText)).toBeInTheDocument();
    expect(screen.getByText(expectedProfessionalText)).toBeInTheDocument();
    expect(screen.getByText(expectedResetText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId(photoElement)).not.toBeChecked();
    expect(screen.getByTestId(videoElement)).not.toBeChecked();
    expect(screen.getByTestId(digitalElement)).not.toBeChecked();
    expect(screen.getByTestId(filmElement)).not.toBeChecked();
    expect(screen.getByTestId(snapshotElement)).not.toBeChecked();
    expect(screen.getByTestId(collectionElement)).not.toBeChecked();
    expect(screen.getByTestId(zeroElement)).not.toBeChecked();
    expect(screen.getByTestId(nonProfessionalElement)).not.toBeChecked();
    expect(screen.getByTestId(professionalElement)).not.toBeChecked();
  });

  it('should render correctly with checked price filter values', () => {
    const expectedFromPlaceholderText = '5000';
    const expectedToPlaceholderText = '10000';
    const { withStoreComponent } = withStore(<Filter minPrice={5000} maxPrice={10000}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByPlaceholderText(expectedFromPlaceholderText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedToPlaceholderText)).toBeInTheDocument();

  });
});
