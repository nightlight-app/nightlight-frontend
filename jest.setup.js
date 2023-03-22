// use default jest setup file
import '@testing-library/jest-native/extend-expect';

// mock async storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

export * from '@testing-library/react-native';

// mock native animated helper to resolve useNativeDriver error
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

/**
 * TODO: Un-used mocks. Left here for reference
 */
// // mock registerRootComponent to resolve error
// jest.mock('expo', () => ({
//   registerRootComponent: jest.fn(),
// }));

// // mock useFonts so that it is loaded right away
// jest.mock('@expo-google-fonts/comfortaa', () => ({
//   // useFonts will return [true] right away
//   useFonts: ({}) => [true],
// }));

// // mock useFonts so that it is loaded right away
// jest.mock('@expo-google-fonts/roboto', () => ({
//   // useFonts will return [true] right away
//   useFonts: ({}) => [true],
// }));

// // mock the react native mapbox
// jest.mock('@rnmapbox/maps', () => ({
//   MapView: () => null,
//   Camera: () => null,
//   CameraStop: () => null,
//   setAccessToken: jest.fn(),
// }));
