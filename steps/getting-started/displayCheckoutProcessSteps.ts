import { Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { startApplicationPage } from '../../globalPagesSetup';
import { CustomWorld } from '../../hooks/globalHooks';

const ACTIVE_BLUE = 'rgb(1, 201, 255)';
const INACTIVE_GREY = 'rgb(217, 226, 236)'; // #D9E2EC

/**
 * AC1:
 * Verifies that the stepper displays all steps
 * ("Start Application", "Payment Plan", "Review") in the correct order.
 */
Then(
  'The checkout stepper should display the following steps in order:',
  async function (this: CustomWorld, _dataTable: DataTable): Promise<void> {
    await expect(startApplicationPage.startApplicationText).toHaveText(
      /^\s*Start Application\s*$/i
    );
    await expect(startApplicationPage.paymentPlanText).toHaveText(
      /^\s*Payment\s*Plan\s*$/i
    );
    await expect(startApplicationPage.reviewText).toHaveText(
      /^\s*Review\s*$/i
    );
  }
);

/**
 * AC2:
 * Validates that "Start Application" is marked as the active step
 * via its circle color.
 */
Then(
  'The "Start Application" step should be active and blue',
  async function (this: CustomWorld): Promise<void> {
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      'background-color',
      ACTIVE_BLUE
    );
  }
);

/**
 * AC3:
 * Validates that the provided steps are inactive
 * by asserting their color/border color is grey.
 */
Then(
  'The following steps should be inactive and grey:',
  async function (this: CustomWorld, dataTable: DataTable): Promise<void> {
    const map: Record<string, typeof startApplicationPage.paymentPlanStepCircle> =
      {
        'payment plan': startApplicationPage.paymentPlanStepCircle,
        review: startApplicationPage.reviewStepCircle
      };

    for (const [nameRaw] of dataTable.rows()) {
      const name = nameRaw.trim().toLowerCase();
      const circle = map[name];

      if (!circle) {
        throw new Error(`Unknown step label: ${nameRaw}`);
      }

      await expect(circle).toHaveCSS('border-color', INACTIVE_GREY);
      await expect(circle).toHaveCSS('color', INACTIVE_GREY);
    }
  }
);