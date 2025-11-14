import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { startApplicationPage } from '../../globalPagesSetup';
import { generateTestUser } from '../../utilities/qa-data-reader';
import { PersonalInformationData } from '../../pages/StartApplicationPage';

/**
 * Fills Step 1 with all required and optional fields using generated test data.
 */
When(
  'User enters valid information in all required and optional fields',
  async function () {
    const user = generateTestUser() as PersonalInformationData;
    await startApplicationPage.fillPersonalInformation(user);
  }
);

/**
 * Fills Step 1 with only required fields using generated test data.
 */
When(
  'User enters valid information in only the required fields',
  async function () {
    const user = generateTestUser() as PersonalInformationData;

    await startApplicationPage.fillPersonalInformation({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
      // optional fields intentionally omitted
    });
  }
);

/**
 * Clicks the Next button on Step 1 to move forward in the wizard.
 */
When('User clicks the Next button on Step 1', async function () {
  await startApplicationPage.clickNextButton();
});

/**
 * Verifies that Step 1 is marked as completed (green indicator).
 */
Then(
  'Step 1 stepper indicator should display as completed green',
  async function () {
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      'background-color',
      'rgb(172, 245, 138)'
    );
  }
);

/**
 * Verifies that Step 2 is marked as active (blue indicator).
 */
Then(
  'Step 2 stepper indicator should be active blue',
  async function () {
    await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
      'background-color',
      'rgb(1, 201, 255)'
    );
  }
);