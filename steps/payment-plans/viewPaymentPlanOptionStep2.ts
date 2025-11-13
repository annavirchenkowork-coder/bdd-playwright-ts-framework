import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { paymentPlanPage } from '../../globalPagesSetup';
import { BrowserUtility } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ----- panel visible ----- */
Then(
  'The {string} plan panel should be visible',
  async function (this: CustomWorld, plan: string): Promise<void> {
    const planKey = BrowserUtility.normalizePlan(plan);
    const { frame } = BrowserUtility.planLocators(planKey, paymentPlanPage);
    await expect(frame).toBeVisible();
  }
);

/* ----- first row text (title line) ----- */
Then(
  'The first row of the {string} plan should display {string}',
  async function (
    this: CustomWorld,
    plan: string,
    expected: string
  ): Promise<void> {
    const planKey = BrowserUtility.normalizePlan(plan);
    const { option } = BrowserUtility.planLocators(planKey, paymentPlanPage);
    const txt = (await option.innerText()).trim();
    expect(txt).toBe(expected);
  }
);

/* ----- second row text (price line) ----- */
Then(
  'The second row of the {string} plan should display {string}',
  async function (
    this: CustomWorld,
    plan: string,
    expected: string
  ): Promise<void> {
    const planKey = BrowserUtility.normalizePlan(plan);
    const { amount } = BrowserUtility.planLocators(planKey, paymentPlanPage);
    const txt = (await amount.innerText()).trim();
    expect(txt).toBe(expected);
  }
);

/* ----- exact count of plan options (should be 1 each) ----- */
Then(
  'There should be exactly {int} {string} plan option',
  async function (
    this: CustomWorld,
    count: number,
    plan: string
  ): Promise<void> {
    const planKey = BrowserUtility.normalizePlan(plan);
    const { option } = BrowserUtility.planLocators(planKey, paymentPlanPage);
    const actual = await option.count();
    expect(actual).toBe(count);
  }
);

/* ----- coupons badge visible on each plan ----- */
Then(
  'The {string} plan should show a {string} control',
  async function (
    this: CustomWorld,
    plan: string,
    controlText: string
  ): Promise<void> {
    const planKey = BrowserUtility.normalizePlan(plan);
    const { frame } = BrowserUtility.planLocators(planKey, paymentPlanPage);

    const chip = frame.locator('.coupon-badge');
    await expect(chip).toHaveCount(1);
    await expect(chip.first()).toBeVisible();
    await expect(chip.first()).toHaveText(new RegExp(controlText, 'i'));
  }
);