import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../mocks/mock-component';
import { NothingFoundMessage } from './nothing-found-message';

describe('Component: NothingFoundMessage', () => {

  it('should render correctly', () => {
    const expectedMessageText = 'По вашему запросу ничего не найдено';

    const { withStoreComponent } = withStore(<NothingFoundMessage/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedMessageText)).toBeInTheDocument();
  });

});
