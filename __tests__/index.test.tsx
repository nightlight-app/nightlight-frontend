import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '@nightlight/src/App';
import { SafeAreaView } from 'react-native';
import { Route } from '@nightlight/src/types';

describe('Component <App />', () => {
  // define the list of routes to iterate through
  const routes = Object.values(Route);

  test('it should have a safe area view', () => {
    // render the app
    render(<App />);

    // get all safe area views
    const safeAreaViews = screen.UNSAFE_queryAllByType(SafeAreaView);

    // expect safe area views to exist
    expect(safeAreaViews).not.toBeNull();

    // TODO: this unit test needs to be more thorough (i.e. all components are rendered inside of the view)
  });

  test.each(routes)(
    'it should have a working navigation for Route [%s]',
    async route => {
      // render the app
      render(<App />);

      // get the pressable to the route (throws error if no exist)
      const pressable = screen.getByLabelText(route);

      // click on the pressable
      fireEvent(pressable, 'press');

      // get the corresponding screen (throws error if no exist)
      screen.getByTestId(route);

      // expect all other screens to not be rendered
      routes.forEach(async otherRoute => {
        // only test for other routes
        if (route !== otherRoute) {
          const shouldNotRenderScreen = screen.queryByTestId(otherRoute);

          // expect not to be rendered
          expect(shouldNotRenderScreen).toBeNull();
        }
      });
    }
  );
});
