import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { reviewPaymentPage } from '../../globalPagesSetup';
import { microSettle } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ======================================
   Typing expiration date inside iframe
   ====================================== */
When(
  'User types {string} into the Expiration Date field',
  async function (this: CustomWorld, value: string): Promise<void> {
    await reviewPaymentPage.expiryDateInput.fill('');
    await reviewPaymentPage.expiryDateInput.type(value);

    // Allow Stripe to validate & render inline error
    await microSettle(this.page, 150);
  }
);

/* ======================================
   Expiry Date Error Visibility
   ====================================== */
Then(
  'The Expiration Date field error should be visible',
  async function (this: CustomWorld): Promise<void> {
    await expect(reviewPaymentPage.cardExpiryErrorMessage).toBeVisible();
  }
);

/* ======================================
   Expiry Date Error Text Matching
   ====================================== */
Then(
  'The Expiration Date field error should contain {string}',
  async function (this: CustomWorld, message: string): Promise<void> {
    await expect(reviewPaymentPage.cardExpiryErrorMessage).toContainText(
      message,
      { ignoreCase: true }
    );
  }
);