import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { startApplicationPage } from '../../globalPagesSetup';
import { productInfo } from '../../utilities/qa-data-reader';
import { BrowserUtility } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ========== AC1: elements visible ========== */

/**
 * Verifies the Program Start Date element is visible on Step 1.
 */
Then(
  'The Program Start Date is visible',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.programStartDate).toBeVisible();
  }
);

/**
 * Verifies the Refund End Date element is visible on Step 1.
 */
Then(
  'The Refund End Date is visible',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.refundEndDate).toBeVisible();
  }
);

/* ========== AC2: values match expected test data ========== */

/**
 * Asserts the Program Start Date text matches the expected value from test data.
 */
Then(
  'The Program Start Date matches the expected value',
  async function (this: CustomWorld): Promise<void> {
    const actual = await BrowserUtility.cleanText(
      startApplicationPage.programStartDate
    );
    const expected = String(productInfo.startDate).trim();
    expect(actual).toBe(expected);
  }
);

/**
 * Asserts the Refund End Date text matches the expected value from test data.
 */
Then(
  'The Refund End Date matches the expected value',
  async function (this: CustomWorld): Promise<void> {
    const actual = await BrowserUtility.cleanText(
      startApplicationPage.refundEndDate
    );
    const expected = String(productInfo.refundDate).trim();
    expect(actual).toBe(expected);
  }
);