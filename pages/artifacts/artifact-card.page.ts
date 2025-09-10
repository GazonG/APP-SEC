import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class ArtifactCardPage extends BasePage {
  protected PAGE_URL = '/' + '#/assets/artifacts/create';
  protected TITLE = 'Создание артефакта';

  async navigate() {
    const baseURL = process.env.STAND_URL;
    // Переходим на базовый URL (главную страницу)
    await this.page.goto(baseURL!);
    // Теперь меняем hash на нужный путь
    await this.page.evaluate((path) => {
      window.location.hash = path;
    }, this.PAGE_URL);
    // Ждем загрузки страницы - можно ждать появления конкретного элемента, например, заголовка
    await this.page.waitForLoadState('networkidle');
    // Или явно подождать элемент
    await this.page.waitForSelector('h1:has-text("Создание артефакта")');
  }
}
