import { Page } from '@playwright/test';
import { LeftMainPage } from './pages/LeftMainPage';
import { PaymentPlanPage } from './pages/PaymentPlanPage';
import { StartApplicationPage } from './pages/StartApplicationPage';
import { ReviewPaymentPage } from './pages/ReviewPaymentPage';

// Exported global references for use across steps
export let leftMainPage: LeftMainPage;
export let paymentPlanPage: PaymentPlanPage;
export let startApplicationPage: StartApplicationPage;
export let reviewPaymentPage: ReviewPaymentPage;
export let page: Page;

/**
 * Initializes all page objects with the provided Playwright Page instance
 */
export const initElements = (argPage: Page): void => {
  page = argPage;

  leftMainPage = new LeftMainPage(page);
  paymentPlanPage = new PaymentPlanPage(page);
  startApplicationPage = new StartApplicationPage(page);
  reviewPaymentPage = new ReviewPaymentPage(page);
};