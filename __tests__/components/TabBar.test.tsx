import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import App from '@nightlight/src/App';
import { SafeAreaView } from 'react-native';
import { Route } from '@nightlight/src/types';

// mock registerRootComponent to resolve error
jest.mock('expo', () => ({
  registerRootComponent: (component: React.ComponentType) => component,
}));

describe('Component <App />', () => {
  test('it should have a safe area view', () => {
    // render the app
    const { UNSAFE_queryAllByType } = render(<App />);

    // get all safe area views
    const safeAreaViews = UNSAFE_queryAllByType(SafeAreaView);

    // expect safe area views to exist
    expect(safeAreaViews).not.toBeNull();

    // TODO: this unit test needs to be more thorough (i.e. all components are rendered inside of the view)
  });

  test('it should have a working navigation', async () => {
    // render the app
    render(<App />);

    // define the list of routes to iterate through
    const routes = Object.values(Route);

    // iterate through all the routes
    routes.forEach(async route => {
      // find the pressable to the route
      const pressable = await screen.findByLabelText(route);

      // expect pressable to exist
      expect(pressable).not.toBeNull();

      // click on the pressable
      fireEvent(pressable, 'press');

      // expect the corresponding screen to render
      const expectedScreen = await screen.findByTestId(`${route}Screen`);

      // expect screen is rendered and not null
      expect(expectedScreen).not.toBeNull();

      // expect all other screens to not be rendered
      routes.forEach(async otherRoute => {
        // only test for other routes
        if (route !== otherRoute) {
          const shouldNotRenderScreen = await screen.findByTestId(
            `${otherRoute}Screen`
          );

          // expect not to be rendered
          expect(shouldNotRenderScreen).toBeNull();
        }
      });
    });
  });
});
