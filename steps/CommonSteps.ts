import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {
  startApplicationPage,
  paymentPlanPage,
  reviewPaymentPage
} from '../globalPagesSetup';
import { productInfo } from '../utilities/qa-data-reader';
import { microSettle } from '../utilities/Browserutility';
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
 * and navigates to the Payment Plan step.
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

/**
 * Reusable flow:
 * Step 1 → Step 2 → Step 3 (Review Payment)
 * - fills Start Application form with productInfo
 * - selects an upfront payment plan
 * - lands on the Review Payment page.
 */
Given(
  'User proceeds to the Review Payment page',
  async function (this: CustomWorld): Promise<void> {
    // Ensure we start from the enrollment page
    await startApplicationPage.login();

    // ---- Step 1: Fill personal details ----
    await startApplicationPage.firstNameInputBox.fill(productInfo.firstName);
    await startApplicationPage.lastNameInputBox.fill(productInfo.lastName);
    await startApplicationPage.emailInputBox.fill(productInfo.email);
    await startApplicationPage.phoneNumberInputBox.fill(productInfo.phone);
    await startApplicationPage.selectHowDidYouHearAboutUs(
      productInfo.howDidYouHear
    );

    await startApplicationPage.clickNextButton();
    await microSettle(this.page);

    // ---- Step 2: Select upfront plan and go Next ----
    await paymentPlanPage.selectPaymentPlan('upfront');
    await microSettle(this.page);

    await paymentPlanPage.clickNextButton();
    await microSettle(this.page);

    // ---- Step 3: Wait for Review Payment page ----
    await reviewPaymentPage.paymentForm.waitFor({
      state: 'visible',
      timeout: 5000
    });
  }
);