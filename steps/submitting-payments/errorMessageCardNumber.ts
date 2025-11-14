import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { reviewPaymentPage } from '../../globalPagesSetup';
import { BrowserUtility } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ============================
   Typing card number
   ============================ */
When(
  'User types {string} into the Card Number field',
  async function (this: CustomWorld, value: string): Promise<void> {
    await BrowserUtility.fillStripeInput(
      reviewPaymentPage.cardNumberInput,
      value
    );
  }
);

/* ============================
   Checking Terms & Conditions
   ============================ */
When(
  'User checks the Terms and Conditions checkbox',
  async function (this: CustomWorld): Promise<void> {
    await reviewPaymentPage.clickTermsAndConditionsCheckbox();
  }
);

/* ============================
   Error visibility
   ============================ */
Then(
  'The Card Number field error should be visible',
  async function (this: CustomWorld): Promise<void> {
    await expect(reviewPaymentPage.cardNumberErrorMessage).toBeVisible();
  }
);

/* ============================
   Error content check
   ============================ */
Then(
  'The Card Number field error should contain {string}',
  async function (this: CustomWorld, text: string): Promise<void> {
    await expect(reviewPaymentPage.cardNumberErrorMessage).toContainText(text, {
      ignoreCase: true
    });
  }
);