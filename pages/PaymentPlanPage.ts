import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the Payment Plan (Step 2) screen.
 * Exposes locators and helpers for selecting and validating payment plans.
 */
export class PaymentPlanPage extends BasePage {
  // Step header / key labels
  readonly chooseAPaymentPlanText: Locator;

  // Upfront option
  readonly upfrontPaymentOption: Locator;
  readonly upfrontPaymentAmount: Locator;
  readonly payOnceTextUpFront: Locator;
  readonly upfrontPaymentFrame: Locator;

  readonly greenBadgeUpfrontDiscount: Locator;
  readonly greenBadgeElectricBoltUpfrontDiscount: Locator;
  readonly greenBadgeTextUpfrontDiscount: Locator;
  readonly couponAvailableBadgeUpfrontDiscount: Locator;
  readonly couponBoxCloseBtnX: Locator;

  readonly basePriceTextUnderUpfront: Locator;
  readonly basePriceAmountUnderUpfront: Locator;
  readonly upfrontDiscountTextUnderUpfront: Locator;
  readonly upfrontDiscountAmountUnderUpfront: Locator;
  readonly iHaveAPromoCodeButtonUnderUpfront: Locator;
  readonly subtotalTextUnderUpfront: Locator;
  readonly subtotalAmountUnderUpfront: Locator;
  readonly excludingFeesTextUnderUpfront: Locator;

  // Installments option
  readonly installmentsPaymentOption: Locator;
  readonly installmentsPaymentFrame: Locator;
  readonly installmentsPaymentAmount: Locator;
  readonly perMonthTextInstallments: Locator;
  readonly couponAvailableBadgeInstallments: Locator;

  readonly basePriceTextUnderInstallments: Locator;
  readonly basePriceAmountUnderInstallments: Locator;
  readonly installmentsTextUnderInstallments: Locator;
  readonly installmentsNumberUnderInstallments: Locator;
  readonly pricePerInstallmentsTextUnderInstallments: Locator;
  readonly pricePerInstallmentsAmountUnderInstallments: Locator;
  readonly dueTodayTextUnderInstallments: Locator;
  readonly firstMonthPaymentTextUnderInstallments: Locator;
  readonly firstMonthPaymentAmountUnderInstallments: Locator;
  readonly excludingFeesTextUnderInstallments: Locator;
  readonly iHaveAPromoCodeButtonUnderInstallments: Locator;

  // Navigation / footer
  readonly inactiveNextButton: Locator;
  readonly activeNextButton: Locator;
  readonly backButton: Locator;
  readonly footerText: Locator;

  // Misc / stepper
  readonly paymentPlanBoxes: Locator;
  readonly step1: Locator;
  readonly step2: Locator;
  readonly step3: Locator;
  readonly upfrontText: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.chooseAPaymentPlanText = page.locator(
      "//*[text()='Choose a payment plan']"
    );

    // Upfront option
    this.upfrontPaymentOption = page.locator(
      "//span[@class='payment-type'][contains(text(),'Upfront')]"
    );
    this.upfrontPaymentAmount = page.locator("//span[@class='discount-price']");
    this.payOnceTextUpFront = page.locator(
      "//span[@class='discount-price']/span"
    );
    this.upfrontPaymentFrame = page.locator(
      "(//mat-expansion-panel-header[@role='button'])[1]"
    );

    this.greenBadgeUpfrontDiscount = page.locator(
      "//span[@class='chip-content']"
    );
    this.greenBadgeElectricBoltUpfrontDiscount = page.locator(
      "//span[@class='chip-content']/span[@class='material-symbols-outlined light-icon']"
    );
    this.greenBadgeTextUpfrontDiscount = page.locator(
      "//span[@class='chip-content']"
    );
    this.couponAvailableBadgeUpfrontDiscount = page.locator(
      "//mat-chip[contains(@class, 'coupon-badge')]"
    );
    this.couponBoxCloseBtnX = page.locator(
      '//*[@id="cdk-accordion-child-0"]/div/div/div[3]/mat-form-field/div[1]/div[2]/div[2]/button/span[3]'
    );

    this.basePriceTextUnderUpfront = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]"
    );
    this.basePriceAmountUnderUpfront = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]/following-sibling::span"
    );
    this.upfrontDiscountTextUnderUpfront = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]"
    );
    this.upfrontDiscountAmountUnderUpfront = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]/following-sibling::span"
    );
    this.iHaveAPromoCodeButtonUnderUpfront = page.locator(
      "//button[contains(text(), 'I have a promo code')]"
    );
    this.subtotalTextUnderUpfront = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]"
    );
    this.subtotalAmountUnderUpfront = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]/following-sibling::span"
    );
    this.excludingFeesTextUnderUpfront = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')]"
    );

    // Installments option
    this.installmentsPaymentOption = page.locator(
      "//span[@class='payment-type'][contains(text(),'Installments')]"
    );
    this.installmentsPaymentFrame = page.locator(
      "(//mat-expansion-panel-header[@role='button'])[2]"
    );
    this.installmentsPaymentAmount = page.locator(
      "//span[@class='discount-price ng-star-inserted']"
    );
    this.perMonthTextInstallments = page.locator(
      "//span[@class='discount-price ng-star-inserted']/span"
    );
    this.couponAvailableBadgeInstallments = page.locator(
      "(//mat-chip[contains(@class, 'coupon-badge')])[2]"
    );

    this.basePriceTextUnderInstallments = page.locator(
      "//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]"
    );
    this.basePriceAmountUnderInstallments = page.locator(
      "//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]/following-sibling::span"
    );
    this.installmentsTextUnderInstallments = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]"
    );
    this.installmentsNumberUnderInstallments = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]/following-sibling::span"
    );
    this.pricePerInstallmentsTextUnderInstallments = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]"
    );
    this.pricePerInstallmentsAmountUnderInstallments = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]/following-sibling::span"
    );
    this.dueTodayTextUnderInstallments = page.locator(
      "//span[@class='sub-item-panel ng-star-inserted' and contains(text(), 'Due Today')]"
    );
    this.firstMonthPaymentTextUnderInstallments = page.locator(
      "//div[@class='fee-items-holder']/span[contains(text(), 'First month')]"
    );
    this.firstMonthPaymentAmountUnderInstallments = page.locator(
      "//div[@class='fee-items-holder']/span[contains(text(), 'First month')]/following-sibling::span"
    );
    this.excludingFeesTextUnderInstallments = page.locator(
      "(//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')])[2]"
    );
    this.iHaveAPromoCodeButtonUnderInstallments = page.locator(
      "(//button[contains(text(), 'I have a promo code')])[2]"
    );

    // Navigation / footer
    this.inactiveNextButton = page.locator("//button[text()='Next']");
    this.activeNextButton = page.locator(
      "//button[@class = 'next-button' and text()='Next']"
    );
    this.backButton = page.locator("//span[@class='back-button']");
    this.footerText = page.locator(
      "(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[2]"
    );

    // Misc
    this.paymentPlanBoxes = page.locator(
      "//mat-accordion[@class='mat-accordion']/div/mat-expansion-panel/mat-expansion-panel-header"
    );
    this.step1 = page.locator(
      "//div[@class='step-circle'][contains(.,'1')]"
    );
    this.step2 = page.locator(
      "//div[@class='step-circle'][contains(.,'2')]"
    );
    this.step3 = page.locator(
      "//div[@class='step-circle'][contains(.,'3')]"
    );
    this.upfrontText = page.locator("//span[@class='payment-type']");
  }

  /**
   * Selects a payment plan by name.
   * Accepts values containing "upfront" or "installments" (case-insensitive).
   */
  async selectPaymentPlan(paymentPlan: string): Promise<void> {
    const normalized = paymentPlan.toLowerCase();

    if (normalized.includes('upfront')) {
      await this.upfrontPaymentOption.click();
      return;
    }

    if (normalized.includes('installments')) {
      await this.installmentsPaymentOption.click();
      return;
    }

    throw new Error(`Invalid payment plan: ${paymentPlan}`);
  }

  /**
   * Clicks the active "Next" button to proceed to the next step.
   */
  async clickNextButton(): Promise<void> {
    await this.activeNextButton.click();
  }
}