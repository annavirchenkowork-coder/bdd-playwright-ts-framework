import {
  Before,
  After,
  setWorldConstructor,
  setDefaultTimeout,
  Status,
  World,
  IWorldOptions
} from '@cucumber/cucumber';
import {
  Browser,
  BrowserContext,
  chromium,
  firefox,
  Page,
  webkit
} from '@playwright/test';
import { initElements } from '../globalPagesSetup';
import fs from 'fs';
import path from 'path';

/**
 * Configuration constants
 */
const BROWSER_TYPE = 'chrome';
const HEADLESS_MODE = false;
const MAXIMIZED_WINDOW = true;
const SLOW_MOTION_DELAY = 0;
const DEFAULT_TIMEOUT = 30000;

/**
 * CustomWorld class: Represents the test world for each scenario
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  /**
   * Initializes the browser based on the configured browser type
   */
  private async initializeBrowser(): Promise<Browser> {
    const launchOptions = {
      headless: HEADLESS_MODE,
      slowMo: SLOW_MOTION_DELAY,
      args:
        MAXIMIZED_WINDOW && BROWSER_TYPE.toLowerCase() === 'chrome'
          ? ['--start-maximized']
          : []
    };

    const type = BROWSER_TYPE.toLowerCase();

    if (type === 'firefox') return firefox.launch(launchOptions);
    if (type === 'webkit' || type === 'safari') return webkit.launch(launchOptions);

    return chromium.launch(launchOptions);
  }

  /**
   * Initializes the test environment
   */
  async init(): Promise<void> {
    this.browser = await this.initializeBrowser();
    this.context = await this.browser.newContext(
      MAXIMIZED_WINDOW ? { viewport: null } : {}
    );
    this.page = await this.context.newPage();

    if (MAXIMIZED_WINDOW) {
      await this.page.setViewportSize(
        await this.page.evaluate(() => ({
          width: window.screen.availWidth,
          height: window.screen.availHeight
        }))
      );
    }

    initElements(this.page);
  }

  /**
   * Closes the browser and page
   */
  async close(): Promise<void> {
    await Promise.all([
      this.page?.close().catch((err) =>
        console.warn('Error closing page:', err)
      ),
      this.browser?.close().catch((err) =>
        console.warn('Error closing browser:', err)
      )
    ]);
  }
}

/**
 * Before hook: Initializes the test environment before each scenario
 */
Before(async function (this: CustomWorld) {
  await this.init();
});

/**
 * After hook: Cleans up the test environment after each scenario
 * Takes a screenshot if the scenario failed
 */
After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    await takeScreenshot(this.page, scenario.pickle.name);
  }
  await this.close();
});

/**
 * Takes a screenshot of the current page
 */
async function takeScreenshot(
  page: Page | undefined,
  scenarioName: string
): Promise<void> {
  if (!page) {
    console.warn('Page object not available, skipping screenshot');
    return;
  }

  const screenshotsDir = path.join(
    process.cwd(),
    'reports',
    'screenshots'
  );
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const currentDateTime = new Date()
    .toISOString()
    .replace(/[:T.]/g, '_')
    .slice(0, -5);

  const fileName = `${scenarioName
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')}_${currentDateTime}.png`;

  const filePath = path.join(screenshotsDir, fileName);

  await page.screenshot({ path: filePath, fullPage: true });
}

// Register world + timeout
setWorldConstructor(CustomWorld);
setDefaultTimeout(DEFAULT_TIMEOUT);