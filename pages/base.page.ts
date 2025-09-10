import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected abstract PAGE_URL: string;
  protected abstract TITLE: string;

  constructor(protected page: Page) {}

  get title(): Locator {
    return this.page.getByTestId('page-title').filter({ hasText: this.TITLE });
  }

  async open() {
    await this.page.goto('/');

    await this.page.waitForLoadState('networkidle');

    await this.page.goto(this.PAGE_URL);
  }
}
