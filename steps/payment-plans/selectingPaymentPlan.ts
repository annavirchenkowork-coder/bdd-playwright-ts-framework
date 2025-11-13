import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { paymentPlanPage } from '../../globalPagesSetup';
import { BrowserUtility } from '../../utilities/Browserutility';
import { CustomWorld } from '../../hooks/globalHooks';

/**
 * Asserts that a given plan panel (Upfront / Installments) is expanded.
 */
Then(
  'The {string} plan panel should be expanded',
  async function (this: CustomWorld, planName: string): Promise<void> {
    const { header, summaryProbe } = BrowserUtility.panelFor(
      planName,
      paymentPlanPage
    );

    await expect(header).toBeVisible();

    const aria = await header.getAttribute('aria-expanded');

    if (aria !== null) {
      // If expansion state is driven by aria-expanded, assert it directly.
      expect(aria).toBe('true');
    } else {
      // Fallback: the summary content for that plan should be visible.
      await expect(summaryProbe).toBeVisible();
    }
  }
);

/**
 * Asserts that a given plan panel (Upfront / Installments) is collapsed.
 */
Then(
  'The {string} plan panel should be collapsed',
  async function (this: CustomWorld, planName: string): Promise<void> {
    const { header, summaryProbe } = BrowserUtility.panelFor(
      planName,
      paymentPlanPage
    );

    await expect(header).toBeVisible();

    const aria = await header.getAttribute('aria-expanded');

    if (aria !== null) {
      // If expansion state is driven by aria-expanded, assert it directly.
      expect(aria).toBe('false');
    } else {
      // Fallback: the summary content for that plan should not be visible.
      await expect(summaryProbe).toBeHidden();
    }
  }
);