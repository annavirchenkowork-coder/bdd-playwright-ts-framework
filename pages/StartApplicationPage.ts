import { BasePage } from "./BasePage";
import { Locator } from 'playwright';

export class StartApplicationPage extends BasePage {

  public readonly startApplicationText: Locator 
    = this.page.locator("(//div[@class = 'step-title'])[1]");

  public readonly paymentPlanText: Locator 
    = this.page.locator("(//div[@class = 'step-title'])[2]");

  public readonly reviewText: Locator 
    = this.page.locator("(//div[@class = 'step-title'])[3]");

  public readonly startApplicationStepCircle: Locator 
    = this.page.locator("(//*[@class='step-circle'])[1]");

  public readonly paymentPlanStepCircle: Locator 
    = this.page.locator("(//*[@class='step-circle'])[2]");

  public readonly reviewStepCircle: Locator 
    = this.page.locator("(//*[@class='step-circle'])[3]");

  public readonly firstNameInputBox: Locator 
    = this.page.locator("//input[@formcontrolname='firstName']");

  public readonly lastNameInputBox: Locator 
    = this.page.locator("//input[@formcontrolname='lastName']");

  public readonly emailInputBox: Locator 
    = this.page.locator("//input[@formcontrolname='email']");

  public readonly phoneNumberInputBox: Locator 
    = this.page.locator("//input[@formcontrolname='phoneNumber']");

  public readonly howDidYouHearAboutUsDropDown: Locator 
    = this.page.locator("//mat-label[text()='How did you hear about us?']");

  public readonly emailOptionFromDropDown: Locator 
    = this.page.locator("//mat-option/span[contains(text(), 'Email')]");

  public readonly facebookOptionFromDropDown: Locator 
    = this.page.locator("//mat-option/span[contains(text(), 'Facebook')]");

  public readonly googleOption: Locator 
    = this.page.locator("//mat-option/span[contains(text(), 'Google')]");

  public readonly instagramOptionFromDropDown: Locator 
    = this.page.locator("//mat-option/span[contains(text(), 'Instagram')]");

  public readonly linkedInOptionFromDropDown: Locator 
    = this.page.locator("//mat-option/span[contains(text(), 'LinkedIN')]");

  public readonly twitterOptionFromDropDown: Locator 
    = this.page.locator("//mat-option/span[contains(text(), 'Twitter')]");

  public readonly referredByFriedOptionFromDropDown: Locator 
    = this.page.locator("//mat-option/span[contains(text(), 'Referred by a friend')]");

  public readonly otherOptionFromDropDown: Locator 
    = this.page.locator("//mat-option/span[contains(text(), 'Other')]");

  public readonly firstNameInputBoxForParents: Locator 
    = this.page.locator("(//input[@formcontrolname='firstName'])[2]");

  public readonly lastNameInputBoxForParents: Locator 
    = this.page.locator("(//input[@formcontrolname='lastName'])[2]");

  public readonly emailInputBoxForParents: Locator 
    = this.page.locator("(//input[@formcontrolname='email'])[2]");

  public readonly phoneNumberInputBoxForParents: Locator 
    = this.page.locator("(//input[@formcontrolname='phoneNumber'])[2]");

  public readonly flexiblePaymentsPlanAvailableText: Locator 
    = this.page.locator("//p[text() = 'Flexible payments plan available']");

  public readonly programStartDate: Locator 
    = this.page.locator("//div[contains(text(), 'Program Start Date')]/b[@class='info-value']");

  public readonly refundEndDate: Locator 
    = this.page.locator("(//b[@class='info-value'])[2]");

  public readonly programNameOnInfoCard: Locator 
    = this.page.locator("//p[@class='program-title primary-color']");

  public readonly programPrice: Locator 
    = this.page.locator("//div[@class='col-sm']/b[@class = 'info-primary']");

  public readonly footer: Locator 
    = this.page.locator("//p[@class = 'footer-text' and contains(text(), 'Need help?')]");

  public readonly nextButton: Locator 
    = this.page.locator("//button[@class = 'next-button'][contains(text(), 'Next')]");

  public readonly programBasePrice: Locator 
    = this.page.locator("//span[@class='ng-star-inserted']/s");

  public readonly enterPersonalDetails: Locator 
    = this.page.locator("//b[contains(.,'Enter personal details')]");

  public readonly discountedPrice: Locator 
    = this.page.locator("//b[@class='info-primary']");

  public readonly originalPrice: Locator 
    = this.page.locator("//s[contains(.,'$')]");

  

}



