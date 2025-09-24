import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class IssueCardPage extends BasePage {
  protected PAGE_URL = '#/issues/create';
  protected TITLE = 'Уязвимости';

  get nameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'название уязвимости' });
  }

  get scannerList(): Locator {
    return this.page.getByLabel('сканнер');
  }

  get criticalLevelList(): Locator {
    return this.page.getByLabel('уровень критичности');
  }

  get locationInput(): Locator {
    return this.page.getByRole('textbox', { name: 'url пакета' });
  }

  get descriptionInput(): Locator {
    return this.page.getByRole('textbox', { name: 'краткое описание' });
  }

  get recommendationsInput(): Locator {
    return this.page.locator('textarea[name="recommendations"]');
  }

  get saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Сохранить' });
  }

  get listOptions(): Locator {
    return this.page.locator('[role="option"]');
  }
}
