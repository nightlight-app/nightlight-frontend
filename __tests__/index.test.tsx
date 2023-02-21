import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import App from '@nightlight/src/App';
import { SafeAreaView } from 'react-native';
import { Route } from '@nightlight/src/types';

// mock registerRootComponent to resolve error
jest.mock('expo', () => ({
  registerRootComponent: (component: React.ComponentType) => component,
}));

// mock useFonts so that it is loaded right away
jest.mock('@expo-google-fonts/comfortaa', () => ({
  // useFonts will return [true] right away
  useFonts: ({}) => [true],
}));

// mock the NightlightMap component so there are no issues with import
jest.mock('@nightlight/components/map/NightlightMap', () => '');

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
