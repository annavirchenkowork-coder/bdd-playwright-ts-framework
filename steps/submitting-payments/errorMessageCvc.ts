import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { reviewPaymentPage } from '../../globalPagesSetup';
import { BrowserUtility } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ===============================
   AC1: Typing invalid / short CVC
   =============================== */
When(
  'User types {string} into the Security Code field',
  async function (this: CustomWorld, value: string): Promise<void> {
    await BrowserUtility.fillStripeInput(reviewPaymentPage.cvcInput, value);
  }
);

/* ===============================
   CVC Error Assertions
   =============================== */
Then(
  'The Security Code field error should be visible',
  async function (this: CustomWorld): Promise<void> {
    await expect(reviewPaymentPage.cardCVCErrorMessage).toBeVisible();
  }
);

Then(
  'The Security Code field error should contain {string}',
  async function (this: CustomWorld, msg: string): Promise<void> {
    await expect(reviewPaymentPage.cardCVCErrorMessage).toContainText(msg, {
      ignoreCase: true,
    });
  }
);