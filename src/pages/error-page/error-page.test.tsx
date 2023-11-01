import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorPage } from './error-page';
import { withStore } from '../../mocks/mock-component';
import { fetchProductsAction } from '../../store/api-actions';
import { extractActionsTypes } from '../../mocks/mocks';
import { APIRoute } from '../../const';

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const expectedErrorText = 'Ошибка загрузки';
    const expectedTryText = 'Попробуйте ещё раз';
    const { withStoreComponent } = withStore(<ErrorPage />, {});

    render(withStoreComponent);

    expect(screen.getByText(expectedErrorText)).toBeInTheDocument();
    expect(screen.getByText(expectedTryText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch "fetchProductsAction" when user clicked try button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ErrorPage />, {});
    mockAxiosAdapter.onGet(APIRoute.Products).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.fulfilled.type,
    ]);

  });
});
