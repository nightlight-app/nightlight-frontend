import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  expo: {
    name: 'nightlight',
    slug: 'nightlight',
    owner: 'nightlight-app',
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
      package: 'com.nightlight.nightlight',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#212121',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
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
        projectId: '3f0b5802-1b61-4a4b-82dc-d9ef2a0762ba',
      },
    },
  },
};
