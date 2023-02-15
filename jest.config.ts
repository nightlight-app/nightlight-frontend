import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  projects: [
    // run only ios and android test
    { preset: 'jest-expo/ios' },
    { preset: 'jest-expo/android' },
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  collectCoverage: true,
  coverageReporters: ['html'],
};

export default config;
