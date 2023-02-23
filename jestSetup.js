import { setUpTests } from 'react-native-reanimated/lib/reanimated2/jestUtils';

// configure jest for react native reanimated
setUpTests();

// mock registerRootComponent to resolve error
jest.mock('expo', () => ({
  registerRootComponent: component => component,
}));

// mock useFonts so that it is loaded right away
jest.mock('@expo-google-fonts/comfortaa', () => ({
  // useFonts will return [true] right away
  useFonts: ({}) => [true],
}));

// mock the NightlightMap component so there are no issues with import
jest.mock('@nightlight/components/map/NightlightMap', () => '');

// mock the react native mapbox
jest.mock('@rnmapbox/maps', () => '');
