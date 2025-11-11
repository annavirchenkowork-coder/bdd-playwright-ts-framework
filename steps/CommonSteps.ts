import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {
  startApplicationPage,
  paymentPlanPage,
} from '../globalPagesSetup';
import { productInfo } from '../utilities/qa-data-reader';
import { CustomWorld } from '../hooks/globalHooks';

/**
 * Opens the enrollment page (Step 1 entry point).
 */
Given(
  'User is on the enrollment page',
  async function (this: CustomWorld): Promise<void> {
    await startApplicationPage.login();
  }
);

/**
 * Completes Step 1 with valid personal information
 * and navigates to the payment plan step.
 */
Given(
  'User completed the start application step',
  async function (this: CustomWorld): Promise<void> {
    await startApplicationPage.fillPersonalInformation({
      firstName: productInfo.firstName,
      lastName: productInfo.lastName,
      email: productInfo.email,
      phone: productInfo.phone,
      howDidYouHear: productInfo.howDidYouHear
    });

    await startApplicationPage.clickNextButton();
    await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();
  }
);