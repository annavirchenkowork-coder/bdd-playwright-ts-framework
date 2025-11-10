import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";

/**
 * BrowserUtility class provides utility methods for common browser interactions
 */
export class BrowserUtility {

    // ADD YOUR OWN BROWSER UTILITY METHODS HERE...

  /**
   * Checks a checkbox or radio button and verifies it's checked
   * @param locator - The Playwright Locator for the element
   * @throws Will throw an error if the element can't be checked or verified
   */
  static async check(locator: Locator): Promise<void> {
    await locator.check();
    await expect(locator).toBeChecked();
  }

  /**
   * Unchecks a checkbox or radio button and verifies it's unchecked
   * @param locator - The Playwright Locator for the element
   * @throws Will throw an error if the element can't be unchecked or verified
   */
  static async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
    await expect(locator).not.toBeChecked();
  }

  /**
   * Verifies the title of the current page
   * @param page - The Playwright Page object
   * @param expected - The expected title of the page
   * @throws Will throw an error if the actual title doesn't match the expected title
   */
  static async verify_title(page: Page, expected: string): Promise<void> {
    const actual = await page.title();
    expect(actual).toBe(expected);
  }

  /**
   * Enters input into a form field if it's visible
   * @param locator - The Playwright Locator for the element
   * @param input - The text to enter into the field
   * @throws Will throw an error if the element is not visible
   */
  static async enter_input(locator: Locator, input: string): Promise<void> {
    if (await locator.isVisible()) {
      await locator.fill(input);
    } else {
      throw new Error(`Element is not visible: ${locator}`);
    }
  }
  
}