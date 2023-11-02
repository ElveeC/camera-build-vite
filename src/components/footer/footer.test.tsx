import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { withHistory } from '../../mocks/mock-component';

describe('Component: Footer', () => {

  it('should render correctly', () => {
    const expectedMainLabel = 'Переход на главную';
    const expectedVkLabel = 'Переход на страницу вконтатке';
    const expectedPinterestLabel = 'Переход на страницу pinterest';
    const expectedRedditLabel = 'Переход на страницу reddit';
    const expectedDescriptionText = 'Интернет-магазин фото- и видеотехники';
    const expectedNavigationText = 'Навигация';
    const expectedCatalogText = 'Каталог';
    const expectedWarrantyText = 'Гарантии';
    const expecteDeliveryText = 'Доставка';
    const expectedAboutText = 'О компании';
    const expectedRessourceText = 'Ресурсы';
    const expectedTrainingText = 'Курсы операторов';
    const expectedBlogText = 'Блог';
    const expectedCommunityText = 'Сообщество';
    const expectedSupportText = 'Поддержка';
    const expectedFAQText = 'FAQ';
    const expectedQuestionText = 'Задать вопрос';

    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByLabelText(expectedMainLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedVkLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedPinterestLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedRedditLabel)).toBeInTheDocument();
    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
    expect(screen.getByText(expectedNavigationText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
    expect(screen.getByText(expectedWarrantyText)).toBeInTheDocument();
    expect(screen.getByText(expecteDeliveryText)).toBeInTheDocument();
    expect(screen.getByText(expectedAboutText)).toBeInTheDocument();
    expect(screen.getByText(expectedRessourceText)).toBeInTheDocument();
    expect(screen.getByText(expectedTrainingText)).toBeInTheDocument();
    expect(screen.getByText(expectedBlogText)).toBeInTheDocument();
    expect(screen.getByText(expectedCommunityText)).toBeInTheDocument();
    expect(screen.getByText(expectedSupportText)).toBeInTheDocument();
    expect(screen.getByText(expectedFAQText)).toBeInTheDocument();
    expect(screen.getByText(expectedQuestionText)).toBeInTheDocument();
  });
});
