import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface PersonalInformationData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string; // mapped to phoneNumberInputBox
  howDidYouHear?: string;
}

export class StartApplicationPage extends BasePage {
  readonly startApplicationText: Locator;
  readonly paymentPlanText: Locator;
  readonly reviewText: Locator;

  readonly startApplicationStepCircle: Locator;
  readonly paymentPlanStepCircle: Locator;
  readonly reviewStepCircle: Locator;

  readonly firstNameInputBox: Locator;
  readonly lastNameInputBox: Locator;
  readonly emailInputBox: Locator;
  readonly phoneNumberInputBox: Locator;

  readonly howDidYouHearAboutUsDropDown: Locator;

  readonly emailOptionFromDropDown: Locator;
  readonly facebookOptionFromDropDown: Locator;
  readonly googleOption: Locator;
  readonly instagramOptionFromDropDown: Locator;
  readonly linkedInOptionFromDropDown: Locator;
  readonly twitterOptionFromDropDown: Locator;
  readonly referredByFriedOptionFromDropDown: Locator;
  readonly otherOptionFromDropDown: Locator;

  readonly firstNameInputBoxForParents: Locator;
  readonly lastNameInputBoxForParents: Locator;
  readonly emailInputBoxForParents: Locator;
  readonly phoneNumberInputBoxForParents: Locator;

  readonly flexiblePaymentsPlanAvailableText: Locator;
  readonly programStartDate: Locator;
  readonly refundEndDate: Locator;
  readonly programNameOnInfoCard: Locator;
  readonly programPrice: Locator;
  readonly footer: Locator;
  readonly nextButton: Locator;
  readonly programBasePrice: Locator;
  readonly enterPersonalDetails: Locator;
  readonly discountedPrice: Locator;
  readonly originalPrice: Locator;

  constructor(page: Page) {
    super(page);

    this.startApplicationText = page.locator("(//div[@class = 'step-title'])[1]");
    this.paymentPlanText = page.locator("(//div[@class = 'step-title'])[2]");
    this.reviewText = page.locator("(//div[@class = 'step-title'])[3]");

    const circles = page.locator('.step-circle');
    this.startApplicationStepCircle = circles.nth(0);
    this.paymentPlanStepCircle = circles.nth(1);
    this.reviewStepCircle = circles.nth(2);

    this.firstNameInputBox = page.locator("//input[@formcontrolname='firstName']");
    this.lastNameInputBox = page.locator("//input[@formcontrolname='lastName']");
    this.emailInputBox = page.locator("//input[@formcontrolname='email']");
    this.phoneNumberInputBox = page.locator(
      "//input[@formcontrolname='phoneNumber']"
    );

    this.howDidYouHearAboutUsDropDown = page.locator(
      "//mat-label[text()='How did you hear about us?']"
    );

    this.emailOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Email')]"
    );
    this.facebookOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Facebook')]"
    );
    this.googleOption = page.locator(
      "//mat-option/span[contains(text(), 'Google')]"
    );
    this.instagramOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Instagram')]"
    );
    this.linkedInOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'LinkedIN')]"
    );
    this.twitterOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Twitter')]"
    );
    this.referredByFriedOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Referred by a friend')]"
    );
    this.otherOptionFromDropDown = page.locator(
      "//mat-option/span[contains(text(), 'Other')]"
    );

    this.firstNameInputBoxForParents = page.locator(
      "(//input[@formcontrolname='firstName'])[2]"
    );
    this.lastNameInputBoxForParents = page.locator(
      "(//input[@formcontrolname='lastName'])[2]"
    );
    this.emailInputBoxForParents = page.locator(
      "(//input[@formcontrolname='email'])[2]"
    );
    this.phoneNumberInputBoxForParents = page.locator(
      "(//input[@formcontrolname='phoneNumber'])[2]"
    );

    this.flexiblePaymentsPlanAvailableText = page.locator(
      "//p[text() = 'Flexible payments plan available']"
    );
    this.programStartDate = page.locator(
      "//div[contains(text(), 'Program Start Date')]/b[@class='info-value']"
    );
    this.refundEndDate = page.locator("(//b[@class='info-value'])[2]");
    this.programNameOnInfoCard = page.locator(
      "//p[@class='program-title primary-color']"
    );
    this.programPrice = page.locator(
      "//div[@class='col-sm']/b[@class = 'info-primary']"
    );
    this.footer = page.locator(
      "//p[@class = 'footer-text' and contains(text(), 'Need help?')]"
    );
    this.nextButton = page.locator(
      "//button[@class = 'next-button'][contains(text(), 'Next')]"
    );
    this.programBasePrice = page.locator(
      "//span[@class='ng-star-inserted']/s"
    );
    this.enterPersonalDetails = page.locator(
      "//b[contains(.,'Enter personal details')]"
    );
    this.discountedPrice = page.locator("//b[@class='info-primary']");
    this.originalPrice = page.locator("//s[contains(.,'$')]");
  }

  /**
   * Types the given first name into the primary first name field.
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInputBox.fill(firstName);
  }

  /**
   * Types the given last name into the primary last name field.
   */
  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInputBox.fill(lastName);
  }

  /**
   * Types the given email into the primary email field.
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailInputBox.fill(email);
  }

  /**
   * Types the given phone number into the primary phone field.
   */
  async enterPhoneNumber(phoneNumber: string): Promise<void> {
    await this.phoneNumberInputBox.fill(phoneNumber);
  }

  /**
   * Selects "How did you hear about us?" option based on provided label.
   */
  async selectHowDidYouHearAboutUs(howDidYouHear: string): Promise<void> {
    const option = howDidYouHear.toLowerCase();
    await this.howDidYouHearAboutUsDropDown.click();

    switch (option) {
      case 'email':
        await this.emailOptionFromDropDown.click();
        break;
      case 'facebook':
        await this.facebookOptionFromDropDown.click();
        break;
      case 'google':
        await this.googleOption.click();
        break;
      case 'instagram':
        await this.instagramOptionFromDropDown.click();
        break;
      case 'linkedin':
        await this.linkedInOptionFromDropDown.click();
        break;
      case 'twitter':
        await this.twitterOptionFromDropDown.click();
        break;
      default:
        // If needed, handle "Other" or ignore silently
        break;
    }
  }

  /**
   * Clicks the Next button to proceed to Step 2 of the flow.
   */
  async clickNextButton(): Promise<void> {
    await this.nextButton.click();
  }

  /**
   * Fills personal information fields based on provided data object.
   */
  async fillPersonalInformation(data: PersonalInformationData = {}): Promise<void> {
    if (data.firstName) {
      await this.firstNameInputBox.fill(data.firstName);
    }
    if (data.lastName) {
      await this.lastNameInputBox.fill(data.lastName);
    }
    if (data.email) {
      await this.emailInputBox.fill(data.email);
    }
    if (data.phone) {
      await this.phoneNumberInputBox.fill(data.phone);
    }
    if (data.howDidYouHear) {
      await this.selectHowDidYouHearAboutUs(data.howDidYouHear);
    }
  }
}