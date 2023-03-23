// mock async storage
// https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// configure jest for react native reanimated
// setUpTests();

// mock registerRootComponent to resolve error
// jest.mock('expo');

// mock useFonts so that it is loaded right away
// jest.mock('@expo-google-fonts/comfortaa', () => ({
//   // useFonts will return [true] right away
//   useFonts: ({}) => [true],
// }));

// mock the NightlightMap component so there are no issues with import
// jest.mock('@nightlight/components/map/NightlightMap', '');

// mock the react native mapbox
// jest.mock('@rnmapbox/maps');

// jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
