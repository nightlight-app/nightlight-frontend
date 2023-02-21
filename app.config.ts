import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  expo: {
    name: 'nightlight',
    slug: 'nightlight',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#212121',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.nightlight.nightlight',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#212121',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    entryPoint: './src/App.tsx',
    plugins: [
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsImpl: 'mapbox',
          RNMapboxMapsDownloadToken: process.env.MAPBOX_API_KEY,
        },
      ],
    ],
    extra: {
      eas: {
        projectId: 'e39bb1cc-b91d-4eea-86ef-83ee8a819896',
      },
    },
  },
};
