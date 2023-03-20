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
    await expect(element(by.id('signin-email-input'))).toExist();
    await expect(element(by.id('signin-password-input'))).toExist();
    await expect(element(by.id('signin-password-visibility'))).toExist();
    await expect(element(by.id('signin-forgot-password-button'))).toExist();
    await expect(element(by.id('signin-button'))).toExist();
    await expect(element(by.id('signin-signup-button'))).toExist();
  });
});
