import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { BrowserUtility } from '../utilities/Browserutility';

/**
 * BasePage class represents common functionality for all page objects
 */
export class BasePage {
  
  protected page: Page;

  /**
   * Constructs a BasePage instance
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
  }
  
  /**
   * Performs login operation using Basic Authentication
   * and navigates to the specified URL
   * @throws Will throw an error if login fails or page title doesn't match
   */
  async login(){
    const code = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");
    await this.page.setExtraHTTPHeaders({Authorization: `Basic ${code}`,});
    await this.page.goto(process.env.SEP_QA_URL as string);
    BrowserUtility.verify_title(this.page, 'Checkout | Cydeo');
    await this.page.waitForLoadState("networkidle");   
    
  }
}