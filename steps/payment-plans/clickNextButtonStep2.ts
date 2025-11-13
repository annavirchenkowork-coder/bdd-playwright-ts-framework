import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { paymentPlanPage, startApplicationPage } from '../../globalPagesSetup';
import { microSettle } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ========== AC1: Next button default state ========== */
Then(
  'The next button on step two should be disabled by default',
  async function (this: CustomWorld): Promise<void> {
    await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
    await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
  }
);

/* ========== AC2: Enabling Next after selecting plan ========== */
When(
  'User selects upfront payment plan',
  async function (this: CustomWorld): Promise<void> {
    await paymentPlanPage.selectPaymentPlan('upfront');
    await microSettle(this.page); // wait for expand/DOM updates
  }
);

Then(
  'The next button on step two should be enabled',
  async function (this: CustomWorld): Promise<void> {
    await expect(paymentPlanPage.activeNextButton).toBeVisible();
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
  }
);

/* ========== AC3: Stepper colors ========== */
Then(
  'Step one stepper should be green',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      'background-color',
      'rgb(172, 245, 138)'
    );
  }
);

Then(
  'Step two stepper should be blue',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
      'background-color',
      'rgb(1, 201, 255)'
    );
  }
);

When(
  'User clicks the next button on payment plan page',
  async function (this: CustomWorld): Promise<void> {
    await paymentPlanPage.clickNextButton();
    await microSettle(this.page);
  }
);

Then(
  'Step two stepper should be green',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
      'background-color',
      'rgb(172, 245, 138)'
    );
  }
);

Then(
  'Step three stepper should be blue',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.reviewStepCircle).toHaveCSS(
      'background-color',
      'rgb(1, 201, 255)'
    );
  }
);

/* ========== AC5: Price summary appears for each plan ========== */
Then(
  'The upfront payment summary should be displayed',
  async function (this: CustomWorld): Promise<void> {
    await expect(paymentPlanPage.basePriceAmountUnderUpfront).toBeVisible();
    await expect(paymentPlanPage.upfrontDiscountAmountUnderUpfront).toBeVisible();
    await expect(paymentPlanPage.subtotalAmountUnderUpfront).toBeVisible();
  }
);

When(
  'User selects installments payment plan',
  async function (this: CustomWorld): Promise<void> {
    await paymentPlanPage.selectPaymentPlan('installments');
    await microSettle(this.page);
  }
);

Then(
  'The installment payment summary should be displayed',
  async function (this: CustomWorld): Promise<void> {
    await expect(paymentPlanPage.basePriceAmountUnderInstallments).toBeVisible();
    await expect(paymentPlanPage.installmentsNumberUnderInstallments).toBeVisible();
    await expect(paymentPlanPage.pricePerInstallmentsAmountUnderInstallments).toBeVisible();
    await expect(paymentPlanPage.firstMonthPaymentAmountUnderInstallments).toBeVisible();
  }
);

/* ========== AC6: Back button presence + navigation ========== */
Then(
  'The back button is displayed on the payment plan page',
  async function (this: CustomWorld): Promise<void> {
    await expect(paymentPlanPage.backButton).toBeVisible();
  }
);

Then(
  'The back button is enabled on the payment plan page',
  async function (this: CustomWorld): Promise<void> {
    await expect(paymentPlanPage.backButton).toBeEnabled();
  }
);

When(
  'User clicks the back button on payment plan page',
  async function (this: CustomWorld): Promise<void> {
    await paymentPlanPage.backButton.click();
    await microSettle(this.page);
  }
);

Then(
  'Step one stepper should be blue',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      'background-color',
      'rgb(1, 201, 255)'
    );
  }
);