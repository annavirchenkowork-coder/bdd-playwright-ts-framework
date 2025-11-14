import { expect, Locator, Page } from '@playwright/test';
import { LeftMainPage } from '../pages/LeftMainPage';
import { PaymentPlanPage } from '../pages/PaymentPlanPage';

/**
 * Minimal shape of a World/context that can cache a LeftMainPage instance.
 */
type LeftMainContext = {
  page: Page;
  _leftMain?: LeftMainPage;
};

export class BrowserUtility {
  /**
   * Returns a scenario-scoped LeftMainPage instance stored on the test context.
   */
  static getLeftMain(ctx: LeftMainContext): LeftMainPage {
    if (!ctx._leftMain) {
      ctx._leftMain = new LeftMainPage(ctx.page);
    }
    return ctx._leftMain;
  }

  /**
   * Reads locator text, trims it, and normalizes whitespace.
   */
  static async cleanText(locator: Locator): Promise<string> {
    const raw = (await locator.textContent()) ?? '';
    return raw.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
  }

  /**
   * Parses a money string like "$400" or "$1,200.50" into a number.
   */
  static moneyToNumber(text: string): number {
    const n = Number(String(text).replace(/[^\d.]/g, ''));
    if (Number.isNaN(n)) {
      throw new Error(`Cannot parse money from: ${text}`);
    }
    return n;
  }

  /**
   * Checks if a control is valid using native validity, ARIA, or Angular CSS markers.
   */
  static async controlIsValid(locator: Locator): Promise<boolean> {
    return locator.evaluate((el: any) => {
      if (typeof el.checkValidity === 'function') return el.checkValidity();

      const field =
        el.closest('.mat-mdc-form-field') || el.closest('mat-form-field');

      const take = (n: any) => n === true || n === 'true';

      if (el.hasAttribute('aria-invalid')) {
        return !take(el.getAttribute('aria-invalid'));
      }
      if (field && field.hasAttribute('aria-invalid')) {
        return !take(field.getAttribute('aria-invalid'));
      }

      const cl = (node: Element | null) =>
        (node && (node as any).classList) || { contains: () => false };

      if (cl(el).contains('ng-invalid') || cl(field).contains('ng-invalid')) {
        return false;
      }
      if (cl(el).contains('ng-valid') || cl(field).contains('ng-valid')) {
        return true;
      }

      // Default to valid if no clear invalid markers are present.
      return true;
    });
  }

  /**
   * Checks top-level Angular form validity using aria attributes, classes, or native validity.
   */
  static async ngFormValid(page: Page): Promise<boolean> {
    const formEl = await page.$('form');
    if (!formEl) return true;

    return formEl.evaluate((f: any) => {
      if (f.hasAttribute('aria-invalid')) {
        const v = f.getAttribute('aria-invalid');
        if (v === 'true') return false;
        if (v === 'false') return true;
      }

      const cl = (f.classList || { contains: () => false }) as DOMTokenList;
      if (cl.contains('ng-invalid')) return false;
      if (cl.contains('ng-valid')) return true;

      return typeof f.checkValidity === 'function'
        ? f.checkValidity()
        : true;
    });
  }

  /**
   * Types into a field, blurs it, and waits briefly for async validators.
   */
  static async typeAndBlur(locator: Locator, value: string): Promise<void> {
    await locator.fill('');
    if (value) {
      await locator.type(value);
    }
    await locator.blur();
    await locator.page().waitForTimeout(120);
  }

  /**
   * Asserts control validity using polling until expected state is reached.
   */
  static async expectControlValidity(
    locator: Locator,
    expected: boolean
  ): Promise<void> {
    await expect
      .poll(() => BrowserUtility.controlIsValid(locator), {
        timeout: 4000,
        intervals: [120, 200, 300, 500, 900, 1200]
      })
      .toBe(expected);
  }

  /**
   * Returns true if the input element is marked as required.
   */
  static async isRequired(locator: Locator): Promise<boolean> {
    return locator.evaluate((el: any) => !!el.required);
  }

  /**
   * Maps a human-readable plan name to its header and summary locators.
   */
  static panelFor(
    name: string,
    paymentPlanPage: PaymentPlanPage
  ): { header: Locator; summaryProbe: Locator } {
    const k = name.toLowerCase();

    if (k.includes('upfront')) {
      return {
        header: paymentPlanPage.upfrontPaymentFrame,
        summaryProbe: paymentPlanPage.basePriceAmountUnderUpfront
      };
    }

    if (k.includes('installments')) {
      return {
        header: paymentPlanPage.installmentsPaymentFrame,
        summaryProbe: paymentPlanPage.basePriceAmountUnderInstallments
      };
    }

    throw new Error(`Unknown plan: ${name}`);
  }

  /**
   * Normalizes a raw plan name into a canonical key.
   */
  static normalizePlan(name: string): 'upfront' | 'installments' {
    return name.toLowerCase().includes('install')
      ? 'installments'
      : 'upfront';
  }

  /**
   * Returns primary locators for the given plan key.
   */
  static planLocators(
    planKey: 'upfront' | 'installments',
    paymentPlanPage: PaymentPlanPage
  ): { frame: Locator; option: Locator; amount: Locator } {
    if (planKey === 'upfront') {
      return {
        frame: paymentPlanPage.upfrontPaymentFrame,
        option: paymentPlanPage.upfrontPaymentOption,
        amount: paymentPlanPage.upfrontPaymentAmount
      };
    }

    if (planKey === 'installments') {
      return {
        frame: paymentPlanPage.installmentsPaymentFrame,
        option: paymentPlanPage.installmentsPaymentOption,
        amount: paymentPlanPage.installmentsPaymentAmount
      };
    }

    throw new Error(`Unknown plan: ${planKey}`);
  }

  /**
   * Fills a Stripe-like iframe input: clears, types, and ensures visibility.
   */
  static async fillStripeInput(
    locator: Locator,
    value: string
  ): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.fill('');
    await locator.type(value);
  }

  /**
   * Checks a checkbox and verifies it is checked.
   */
  static async check(locator: Locator): Promise<void> {
    await locator.check();
    await expect(locator).toBeChecked();
  }

  /**
   * Unchecks a checkbox and verifies it is unchecked.
   */
  static async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
    await expect(locator).not.toBeChecked();
  }

  /**
   * Verifies current page title matches the expected value.
   */
  static async verify_title(page: Page, expected: string): Promise<void> {
    const actual = await page.title();
    expect(actual).toBe(expected);
    // Alternatively: await expect(page).toHaveTitle(expected);
  }

  /**
   * Fills an input if it is visible; otherwise throws for easier debugging.
   */
  static async enter_input(
    locator: Locator,
    input: string
  ): Promise<void> {
    if (await locator.isVisible()) {
      await locator.fill(input);
    } else {
      throw new Error(`Element is not visible: ${locator.toString()}`);
    }
  }
}

/**
 * Waits briefly for UI transitions or async updates to settle.
 */
export async function microSettle(
  page: Page,
  ms = 250
): Promise<void> {
  await page.waitForTimeout(ms);
}