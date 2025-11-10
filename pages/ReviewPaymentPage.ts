import { BasePage } from "./BasePage";
import { Locator, FrameLocator } from 'playwright';

export class ReviewPaymentPage extends BasePage {

  public readonly paymentForm: Locator 
    = this.page.locator("//form[@id='payment-form']");

  public readonly paymentFrame: FrameLocator 
    = this.page.frameLocator("(//iframe[contains(@title, 'Secure payment')])[1]");

  public readonly cardNumberInput: Locator 
    = this.paymentFrame.locator("(//input[@type='text'])[1]");

  public readonly expiryDateInput: Locator 
    = this.paymentFrame.locator("(//input[@type='text'])[2]");

  public readonly cvcInput: Locator 
    = this.paymentFrame.locator("(//input[@type='text'])[3]");

  public readonly countryDropDown: Locator 
    = this.paymentFrame.locator("//select[@name = 'country']");

  public readonly zipCodeInput: Locator 
    = this.paymentFrame.locator("(//input[@type='text'])[4]");

  public readonly byProvidingCardInformationText: Locator 
    = this.page.locator("//p[contains(., 'By providing your card information')]");

  public readonly productPriceText: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]");

  public readonly productPriceAmount: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]/following-sibling::span");

  public readonly installmentPriceText: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]");

  public readonly installmentPriceAmount: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]/following-sibling::span");

  public readonly subtotalText: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]");

  public readonly subtotalAmount: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]/following-sibling::span");

  public readonly processingFeeText: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]");

  public readonly processingFeeAmount: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]/following-sibling::span");

  public readonly totalText: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]");

  public readonly totalAmount: Locator 
    = this.page.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]/following-sibling::span");

  public readonly termsAndConditionsCheckbox: Locator 
    = this.page.locator("//input[@type = 'checkbox']");

  public readonly termsAndConditionsLink: Locator 
    = this.page.locator("//u[normalize-space()='Terms and Conditions']");

  public readonly payButton: Locator 
    = this.page.locator("//button[@type='button']");

  public readonly cardNumberErrorMessage: Locator 
    = this.paymentFrame.locator("//p[@id='Field-numberError' and @class='p-FieldError Error' and @role='alert']");

  public readonly backButton: Locator 
    = this.page.locator("(//span[@class='back-button'])[2]");

  public readonly footerText: Locator 
    = this.page.locator("(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[3]");

  public readonly cardExpiryErrorMessage: Locator 
    = this.paymentFrame.locator("//p[@id='Field-expiryError' and @class='p-FieldError Error' and @role='alert']");

  public readonly cardCVCErrorMessage: Locator 
    = this.paymentFrame.locator("//p[@id='Field-cvcError' and @class='p-FieldError Error' and @role='alert']");

  public readonly zipCodeErrorMessage: Locator 
    = this.paymentFrame.locator("//p[@id='Field-postalCodeError' and @class='p-FieldError Error' and @role='alert']");

  public readonly progressBar: Locator 
    = this.page.locator("//mat-spinner[@role='progressbar']");

  public readonly readAgreeTerms: Locator 
    = this.page.locator("//div[3]/div[4]/div[1]/div[2]/div/div[6]");

  public readonly termsAgreementTextPop: Locator 
    = this.page.locator("//h1[@id='mat-mdc-dialog-title-0']");



}