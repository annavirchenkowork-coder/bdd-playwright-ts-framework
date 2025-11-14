import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {
  startApplicationPage,
  paymentPlanPage
} from '../../globalPagesSetup';
import { BrowserUtility } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/* ========== AC1: fields present & required ========== */

/**
 * First Name field is visible and required.
 */
Then(
  'The First Name field should be present and required',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.firstNameInputBox).toBeVisible();
    expect(
      await BrowserUtility.isRequired(startApplicationPage.firstNameInputBox)
    ).toBe(true);
  }
);

/**
 * Last Name field is visible and required.
 */
Then(
  'The Last Name field should be present and required',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.lastNameInputBox).toBeVisible();
    expect(
      await BrowserUtility.isRequired(startApplicationPage.lastNameInputBox)
    ).toBe(true);
  }
);

/**
 * Email field is visible and required.
 */
Then(
  'The Email Address field should be present and required',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.emailInputBox).toBeVisible();
    expect(
      await BrowserUtility.isRequired(startApplicationPage.emailInputBox)
    ).toBe(true);
  }
);

/**
 * Phone field is visible and required.
 */
Then(
  'The Phone field should be present and required',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.phoneNumberInputBox).toBeVisible();
    expect(
      await BrowserUtility.isRequired(startApplicationPage.phoneNumberInputBox)
    ).toBe(true);
  }
);

/* ========== AC1c: Email format validity ========== */

/**
 * Types a value into the Email Address field and blurs to trigger validation.
 */
When(
  'I type "{word}" into the Email Address field',
  async function (this: CustomWorld, value: string): Promise<void> {
    await BrowserUtility.typeAndBlur(startApplicationPage.emailInputBox, value);
  }
);

/**
 * Asserts email field validity matches expected boolean.
 */
Then(
  'The Email Address field validity should be {word}',
  async function (this: CustomWorld, word: string): Promise<void> {
    const expected = word === 'true';
    await BrowserUtility.expectControlValidity(
      startApplicationPage.emailInputBox,
      expected
    );
  }
);

/* ========== AC1d: Phone numeric-only behavior ========== */

/**
 * Types into the Phone field and captures raw vs actual values for validation.
 */
When(
  'I type "{word}" into the Phone field',
  async function (
    this: CustomWorld & {
      lastPhoneRaw?: string;
      lastPhoneActual?: string;
    },
    value: string
  ): Promise<void> {
    this.lastPhoneRaw = value;

    const phone = startApplicationPage.phoneNumberInputBox;
    await phone.fill('');
    await phone.type(value);
    await phone.blur();
    await this.page.waitForTimeout(50);

    this.lastPhoneActual = await phone.inputValue();
  }
);

/**
 * Validates whether the Phone field accepted only digits as expected.
 */
Then(
  'The Phone field validity should be {word}',
  async function (
    this: CustomWorld & {
      lastPhoneRaw?: string;
      lastPhoneActual?: string;
    },
    word: string
  ): Promise<void> {
    const expected = word === 'true';
    const actual = this.lastPhoneActual ?? '';

    const allDigits = /^\d+$/.test(actual) && actual.length > 0;
    const unchanged = actual === this.lastPhoneRaw;

    const computedValid = allDigits && unchanged;
    expect(computedValid).toBe(expected);
  }
);

/* ========== AC2: Dropdown presence & options ========== */

/**
 * Asserts the specified dropdown is visible ("How did you hear about us?" here).
 */
Then(
  'The {string} dropdown should be present',
  async function (this: CustomWorld, _label: string): Promise<void> {
    await expect(
      startApplicationPage.howDidYouHearAboutUsDropDown
    ).toBeVisible();
  }
);

/**
 * Verifies dropdown contains at least the listed options.
 */
Then(
  'The dropdown should contain at least the options:',
  async function (this: CustomWorld, dataTable: DataTable): Promise<void> {
    await startApplicationPage.howDidYouHearAboutUsDropDown.click();

    const optionTexts = (
      await this.page.locator('mat-option span').allTextContents()
    ).map((t) => t.trim().toLowerCase());

    const expectedOptions = dataTable
      .raw()
      .flat()
      .map((s) => s.trim().toLowerCase());

    for (const item of expectedOptions) {
      expect(optionTexts).toContain(item);
    }
  }
);

/* ========== AC3: Form validity / Next button navigation ========== */

/**
 * Polls Angular form validity and expects the form to be invalid.
 */
Then(
  'The form should be invalid',
  async function (this: CustomWorld): Promise<void> {
    await expect
      .poll(() => BrowserUtility.ngFormValid(this.page), {
        timeout: 2000
      })
      .toBe(false);
  }
);

/**
 * Polls Angular form validity and expects the form to be valid.
 */
Then(
  'The form should be valid',
  async function (this: CustomWorld): Promise<void> {
    await expect
      .poll(() => BrowserUtility.ngFormValid(this.page), {
        timeout: 2000
      })
      .toBe(true);
  }
);

/**
 * Fills a valid first and last name.
 */
When(
  'I enter a valid First Name and Last Name',
  async function (this: CustomWorld): Promise<void> {
    await startApplicationPage.firstNameInputBox.fill('Anna');
    await startApplicationPage.lastNameInputBox.fill('Virchenko');
    await startApplicationPage.lastNameInputBox.blur();
  }
);

/**
 * Fills a valid email address.
 */
When(
  'I enter a valid Email Address',
  async function (this: CustomWorld): Promise<void> {
    await BrowserUtility.typeAndBlur(
      startApplicationPage.emailInputBox,
      'anna.virchenko@example.com'
    );
  }
);

/**
 * Fills a valid phone number.
 */
When(
  'I enter a valid Phone',
  async function (this: CustomWorld): Promise<void> {
    await BrowserUtility.typeAndBlur(
      startApplicationPage.phoneNumberInputBox,
      '2025550188'
    );
  }
);

/**
 * Selects an option in the specified dropdown; currently supports "How did you hear about us?".
 */
When(
  'I select {string} in the {string} dropdown',
  async function (
    this: CustomWorld,
    option: string,
    dropdownLabel: string
  ): Promise<void> {
    if (dropdownLabel.toLowerCase().includes('how did you hear')) {
      await startApplicationPage.selectHowDidYouHearAboutUs(option);
    } else {
      throw new Error(`Unknown dropdown: ${dropdownLabel}`);
    }
  }
);

/**
 * For an invalid form: clicking Next must keep user on Step 1.
 */
Then(
  'Clicking Next should keep me on Step {int}',
  async function (this: CustomWorld, _stepNumber: number): Promise<void> {
    await expect(paymentPlanPage.chooseAPaymentPlanText).toBeHidden({
      timeout: 300
    });

    await startApplicationPage.clickNextButton();

    await expect(startApplicationPage.firstNameInputBox).toBeVisible();
    await expect(paymentPlanPage.chooseAPaymentPlanText).toBeHidden({
      timeout: 300
    });
  }
);

/**
 * For a valid form: clicking Next must navigate to Step 2.
 */
Then(
  'Clicking Next should take me to Step {int}',
  async function (this: CustomWorld, _stepNumber: number): Promise<void> {
    await expect(paymentPlanPage.chooseAPaymentPlanText).toBeHidden({
      timeout: 300
    });

    await startApplicationPage.clickNextButton();

    await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();
  }
);