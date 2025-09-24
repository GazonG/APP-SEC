import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { IssueModalData, IssuesListPage } from './issues-list.page';

interface IssueCardData {
  name: string;
  scanner: string;
  criticalLevel: string;
  location: string;
  description: string;
  recommendations: string;
}

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

  async fillMainFields(options: IssueCardData) {
    await this.nameInput.fill(options.name);

    await this.scannerList.click();
    await this.listOptions.filter({ hasText: options.scanner }).click();

    await this.criticalLevelList.click();
    await this.listOptions.filter({ hasText: options.criticalLevel }).click();

    await this.locationInput.fill(options.location);

    await this.descriptionInput.fill(options.description);

    await this.recommendationsInput.fill(options.recommendations);
  }

  async save() {
    await this.saveButton.click();
  }

  buildIssueCardData() {
    return {
      name: `issueName-${Date.now()}`,
      scanner: 'semgrep',
      criticalLevel: 'Высокий',
      location: 'https://test-url.com',
      description: 'description',
      recommendations: 'recommendations',
    };
  }

  async createIssue(issueModalData?: IssueModalData, issueCardData?: IssueCardData) {
    const issuesList = new IssuesListPage(this.page);
    const data: IssueCardData = issueCardData ?? this.buildIssueCardData();

    await issuesList.initializeIssueCreationFromModal(issueModalData);
    await this.fillMainFields(data);
    await this.save();

    return { ...issueModalData, ...data };
  }
}
