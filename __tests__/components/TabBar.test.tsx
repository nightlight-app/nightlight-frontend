import React from 'react';
import { render } from '@testing-library/react-native';

import App from '@nightlight/src/App';

// mock registerRootComponent to resolve error
jest.mock('expo', () => ({
  registerRootComponent: (component: React.ComponentType) => component,
}));

describe('Component <TabBar />', () => {
  test('it should have a safe area view', () => {
    // render the app
    render(<App />);

    // TODO: check safe area view exists
  });

  test('it should... ', () => {});
});
