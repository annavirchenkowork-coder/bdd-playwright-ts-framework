import { Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { startApplicationPage } from '../../globalPagesSetup';
import { qaData } from '../../utilities/qa-data-reader';
import { BrowserUtility } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ========== @sep07-1: Secure checkout title ========== */
Then(
  'The "Cydeo Secure checkout" title should be visible on the left panel',
  async function (this: CustomWorld): Promise<void> {
    const leftMain = BrowserUtility.getLeftMain(this);
    await expect(leftMain.secureCheckout).toBeVisible();
  }
);

/* ========== @sep07-2: Program name present and correct ========== */
Then(
  'The Program name should be visible on the left panel',
  async function (this: CustomWorld): Promise<void> {
    const leftMain = BrowserUtility.getLeftMain(this);
    await expect(leftMain.programName).toBeVisible();
  }
);

Then(
  'The Program name should match the expected value',
  async function (this: CustomWorld): Promise<void> {
    const leftMain = BrowserUtility.getLeftMain(this);
    const actual = (await leftMain.programName.innerText()).trim();
    expect(actual).toBe(qaData.programName);
  }
);

/* ========== @sep07-3: Left footer order ========== */
Then(
  'The left footer should contain the items in order:',
  async function (this: CustomWorld, dataTable: DataTable): Promise<void> {
    const expected = dataTable
      .raw()
      .flat()
      .map((s) => s.trim());

    const actual: string[] = [];

    const leftMain = BrowserUtility.getLeftMain(this);

    if (await leftMain.cydeoImageAtLeftWindow.isVisible()) {
      actual.push('CYDEO logo');
    }

    const linkTexts = await leftMain.footerElements.allInnerTexts();
    actual.push(...linkTexts.map((t) => t.trim().replace(/\s+/g, ' ')));

    expect(actual).toEqual(expected);
  }
);

/* ========== @sep07-4: Right footer help line ========== */
Then(
  'The right footer help text should be visible',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.footer.first()).toBeVisible();
  }
);

Then(
  'The help text should contain {string}',
  async function (this: CustomWorld, text: string): Promise<void> {
    await expect(startApplicationPage.footer.first()).toContainText(text);
  }
);