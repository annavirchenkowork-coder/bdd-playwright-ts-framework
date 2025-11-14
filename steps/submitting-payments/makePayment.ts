import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { reviewPaymentPage } from '../../globalPagesSetup';
import { microSettle } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ---- Fill valid payment data (Stripe test card) ---- */

When(
  'User enters a valid card number',
  async function (this: CustomWorld): Promise<void> {
    const cardNumber = process.env.CARD_NUMBER ?? '4242 4242 4242 4242';
    await reviewPaymentPage.enterCardNumber(cardNumber);
  }
);

When(
  'User enters a valid expiration date',
  async function (this: CustomWorld): Promise<void> {
    const expiry = process.env.CARD_EXPIRATION_DATE ?? '12/40';
    await reviewPaymentPage.enterExpiryDate(expiry);
  }
);

When(
  'User enters a valid Security Code',
  async function (this: CustomWorld): Promise<void> {
    const cvc = process.env.CARD_SECURITY_CODE ?? '123';
    await reviewPaymentPage.enterCVC(cvc);
  }
);

When(
  'User enters a valid ZIP code',
  async function (this: CustomWorld): Promise<void> {
    const zip = process.env.ZIP_CODE ?? '12345';
    await reviewPaymentPage.enterZipCode(zip);
  }
);

When(
  'User clicks the Pay button',
  async function (this: CustomWorld): Promise<void> {
    await reviewPaymentPage.clickPayButton();
    // Brief settle while Stripe processes and confirmation renders
    await microSettle(this.page, 1500);
  }
);

/* ---- Assertions for success state ---- */

Then(
  'The payment confirmation message should be displayed',
  async function (this: CustomWorld): Promise<void> {
    await expect(reviewPaymentPage.confirmationBox).toBeVisible();
  }
);

Then(
  'The stepper should show all steps completed',
  async function (this: CustomWorld): Promise<void> {
    // Steps 1 and 2 should be marked done
    await expect(reviewPaymentPage.step1Container).toHaveClass(/done/);
    await expect(reviewPaymentPage.step2Container).toHaveClass(/done/);

    // Step 3 is the active/completed step, marked as "editing" or "done" in this UI
    await expect(reviewPaymentPage.step3Container).toHaveClass(/editing|done/);
  }
);