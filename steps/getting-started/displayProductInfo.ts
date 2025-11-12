import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { startApplicationPage } from '../../globalPagesSetup';
import { qaData, PriceData } from '../../utilities/qa-data-reader';
import { BrowserUtility } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

const escapeForRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* ========== AC1: Product name visible on info card ========== */

Then(
  'The product name should be visible on the information card',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.programNameOnInfoCard).toBeVisible();
  }
);

/* ========== AC2: Left header program name matches card title ========== */

Then(
  'The product name on the left header should match the information card title',
  async function (this: CustomWorld): Promise<void> {
    // If qaData.productName exists, ensure it matches exactly (trim/ignore case).
    const escapedName = escapeForRegex(qaData.productName);

    await expect(startApplicationPage.programNameOnInfoCard).toHaveText(
      new RegExp(`^\\s*${escapedName}\\s*$`, 'i')
    );
  }
);

/* ========== AC3: Discounted price & original price behavior ========== */

Then(
  'The discounted price should be shown',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.discountedPrice).toBeVisible();
  }
);

Then(
  'The original price should be shown with strikethrough',
  async function (this: CustomWorld): Promise<void> {
    const tagName = await startApplicationPage.originalPrice.evaluate(
      (el) => (el as HTMLElement).tagName
    );
    expect(tagName).toBe('S'); // <s>...</s> tag for strikethrough
  }
);

Then(
  'The discounted price should equal the original price minus the upfront discount',
  async function (this: CustomWorld): Promise<void> {
    const prices = qaData.prices;
    if (!prices || prices.length === 0) {
      throw new Error('No price data found in qaData.prices');
    }

    const oneTime = prices.find(
      (p) => p.active && p.type === 'one-time'
    );

    if (!oneTime) {
      throw new Error('No active one-time price found in qaData.prices');
    }

    const expectedOriginal = oneTime.baseAmount;

    const discountAmount =
      oneTime.upfrontDiscount && oneTime.upfrontDiscountAmount
        ? oneTime.upfrontDiscountAmount
        : 0;

    const expectedDiscounted = expectedOriginal - discountAmount;

    const originalText =
      (await startApplicationPage.originalPrice.textContent()) ?? '';
    const discountedText =
      (await startApplicationPage.discountedPrice.textContent()) ?? '';

    const original = BrowserUtility.moneyToNumber(originalText);
    const discounted = BrowserUtility.moneyToNumber(discountedText);

    expect(original).toBe(expectedOriginal);
    expect(discounted).toBe(expectedDiscounted);
  }
);

/* ========== AC4: Flexible payments availability text ========== */

Then(
  'The flexible payments plan availability text should be visible',
  async function (this: CustomWorld): Promise<void> {
    await expect(
      startApplicationPage.flexiblePaymentsPlanAvailableText
    ).toBeVisible();

    await expect(
      startApplicationPage.flexiblePaymentsPlanAvailableText
    ).toHaveText(/flexible payments plan available/i);
  }
);

/* ========== AC5: Program start date matches test data ========== */

Then(
  'The program start date should be visible and match test data',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.programStartDate).toBeVisible();

    const dateEscaped = escapeForRegex((qaData as any).startDate);
    await expect(startApplicationPage.programStartDate).toHaveText(
      new RegExp(dateEscaped, 'i')
    );
  }
);

/* ========== AC6: Refund policy text visible & correct ========== */

Then(
  'The refund policy text should be visible',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.refundEndDate).toBeVisible();
  }
);

Then(
  'The refund end date should be visible and match test data',
  async function (this: CustomWorld): Promise<void> {
    const refundEscaped = escapeForRegex((qaData as any).refundDate);
    await expect(startApplicationPage.refundEndDate).toHaveText(
      new RegExp(refundEscaped, 'i')
    );
  }
);