import { TEST_IDS } from '@nightlight/src/constants';
import { by, device, expect, element, waitFor } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have sign in screen', async () => {
    await expect(element(by.text('Sign in with email'))).toBeVisible();
    await expect(element(by.id(TEST_IDS.SIGNIN_EMAIL_INPUT))).toExist();
    await expect(element(by.id(TEST_IDS.SIGNIN_PASSWORD_INPUT))).toExist();
    await expect(element(by.id(TEST_IDS.SIGNIN_PASSWORD_VISIBILITY))).toExist();
    await expect(element(by.id(TEST_IDS.SIGNIN_FORGOT_PASSWORD))).toExist();
    await expect(element(by.id(TEST_IDS.SIGNIN_BUTTON))).toExist();
    await expect(element(by.id(TEST_IDS.SIGNUP_BUTTON))).toExist();
  });
});
