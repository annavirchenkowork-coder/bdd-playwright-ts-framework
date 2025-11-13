import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the Review Payment (Step 3) screen.
 * Encapsulates Stripe payment iframe, summary panel, terms agreement,
 * and stepper state on the final step.
 */
export class ReviewPaymentPage extends BasePage {
  // Root form
  readonly paymentForm: Locator;

  // Stripe iframe & fields
  readonly paymentFrame: FrameLocator;
  readonly cardNumberInput: Locator;
  readonly expiryDateInput: Locator;
  readonly cvcInput: Locator;
  readonly countryDropDown: Locator;
  readonly zipCodeInput: Locator;

  // Texts and price breakdown
  readonly byProvidingCardInformationText: Locator;

  readonly productPriceText: Locator;
  readonly productPriceAmount: Locator;

  readonly installmentPriceText: Locator;
  readonly installmentPriceAmount: Locator;

  readonly subtotalText: Locator;
  readonly subtotalAmount: Locator;

  readonly processingFeeText: Locator;
  readonly processingFeeAmount: Locator;

  readonly totalText: Locator;
  readonly totalAmount: Locator;

  // Terms & actions
  readonly termsAndConditionsCheckbox: Locator;
  readonly termsAndConditionsLink: Locator;
  readonly payButton: Locator;

  // Error messages (Stripe fields)
  readonly cardNumberErrorMessage: Locator;
  readonly cardExpiryErrorMessage: Locator;
  readonly cardCVCErrorMessage: Locator;
  readonly zipCodeErrorMessage: Locator;

  // Navigation / UI
  readonly backButton: Locator;
  readonly footerText: Locator;
  readonly progressBar: Locator;
  readonly readAgreeTerms: Locator;
  readonly termsAgreementTextPop: Locator;
  readonly confirmationBox: Locator;

  // Stepper container states on Review page
  readonly step1Container: Locator;
  readonly step2Container: Locator;
  readonly step3Container: Locator;

  constructor(page: Page) {
    super(page);

    this.paymentForm = page.locator("//form[@id='payment-form']");

    this.paymentFrame = page.frameLocator(
      "(//iframe[contains(@title, 'Secure payment')])[1]"
    );

    this.cardNumberInput = this.paymentFrame.locator(
      "(//input[@type='text'])[1]"
    );
    this.expiryDateInput = this.paymentFrame.locator(
      "(//input[@type='text'])[2]"
    );
    this.cvcInput = this.paymentFrame.locator("(//input[@type='text'])[3]");
    this.countryDropDown = this.paymentFrame.locator(
      "//select[@name = 'country']"
    );
    this.zipCodeInput = this.paymentFrame.locator(
      "(//input[@type='text'])[4]"
    );

    this.byProvidingCardInformationText = page.locator(
      "//p[contains(., 'By providing your card information')]"
    );

    this.productPriceText = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]"
    );
    this.productPriceAmount = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]/following-sibling::span"
    );

    this.installmentPriceText = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]"
    );
    this.installmentPriceAmount = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]/following-sibling::span"
    );

    this.subtotalText = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]"
    );
    this.subtotalAmount = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]/following-sibling::span"
    );

    this.processingFeeText = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]"
    );
    this.processingFeeAmount = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]/following-sibling::span"
    );

    this.totalText = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]"
    );
    this.totalAmount = page.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]/following-sibling::span"
    );

    this.termsAndConditionsCheckbox = page.locator(
      "//input[@type = 'checkbox']"
    );
    this.termsAndConditionsLink = page.locator(
      "//u[normalize-space()='Terms and Conditions']"
    );
    this.payButton = page.locator("//button[@type='button']");

    this.cardNumberErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-numberError' and @class='p-FieldError Error' and @role='alert']"
    );
    this.cardExpiryErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-expiryError' and @class='p-FieldError Error' and @role='alert']"
    );
    this.cardCVCErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-cvcError' and @class='p-FieldError Error' and @role='alert']"
    );
    this.zipCodeErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-postalCodeError' and @class='p-FieldError Error' and @role='alert']"
    );

    this.backButton = page.locator("(//span[@class='back-button'])[2]");
    this.footerText = page.locator(
      "(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[3]"
    );
    this.progressBar = page.locator("//mat-spinner[@role='progressbar']");
    this.readAgreeTerms = page.locator(
      "//div[3]/div[4]/div[1]/div[2]/div/div[6]"
    );
    this.termsAgreementTextPop = page.locator(
      "//h1[@id='mat-mdc-dialog-title-0']"
    );
    this.confirmationBox = page.locator(
      "//div[contains(., 'Payments confirmation')][contains(@class,'ng-star-inserted')]"
    );

    // Stepper states on Review page
    this.step1Container = page.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='1']]"
    );
    this.step2Container = page.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='2']]"
    );
    this.step3Container = page.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='3']]"
    );
  }

  /**
   * Fills the card number field.
   * Uses CARD_NUMBER from environment if not explicitly provided.
   */
  async enterCardNumber(cardNumber: string = process.env.CARD_NUMBER ?? ''): Promise<void> {
    await this.cardNumberInput.fill(cardNumber);
  }

  /**
   * Fills the card expiry date field.
   * Uses CARD_EXPIRATION_DATE from environment if not explicitly provided.
   */
  async enterExpiryDate(
    expiryDate: string = process.env.CARD_EXPIRATION_DATE ?? ''
  ): Promise<void> {
    await this.expiryDateInput.fill(expiryDate);
  }

  /**
   * Fills the card CVC field.
   * Uses CARD_SECURITY_CODE from environment if not explicitly provided.
   */
  async enterCVC(cvc: string = process.env.CARD_SECURITY_CODE ?? ''): Promise<void> {
    await this.cvcInput.fill(cvc);
  }

  /**
   * Fills the ZIP/postal code field.
   * Uses ZIP_CODE from environment if not explicitly provided.
   */
  async enterZipCode(zipCode: string = process.env.ZIP_CODE ?? ''): Promise<void> {
    await this.zipCodeInput.fill(zipCode);
  }

  async clickTermsAndConditionsCheckbox(): Promise<void> {
    await this.termsAndConditionsCheckbox.click();
  }

  async clickBackButton(): Promise<void> {
    await this.backButton.click();
  }

  async clickPayButton(): Promise<void> {
    await this.payButton.click();
  }
}