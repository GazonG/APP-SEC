import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { ArtifactCardPage } from '../artifacts/artifact-card.page';

export interface IssueModalData {
  type: string;
  active: string;
}

export class IssuesListPage extends BasePage {
  protected PAGE_URL = '#/issues';
  protected TITLE = 'Уязвимости';

  get addButton(): Locator {
    return this.page.locator('svg path[d="M11 11H5v2h6v6h2v-6h6v-2h-6V5h-2v6z"]');
  }

  get typeList(): Locator {
    return this.page.getByLabel('тип уязвимости');
  }

  get activeCombobox(): Locator {
    return this.page.getByRole('textbox', { name: 'актив' });
  }

  get listOptions(): Locator {
    return this.page.locator('[role="option"]');
  }

  get saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Сохранить' });
  }

  async add() {
    await this.addButton.click();
  }

  async fillMainFields(options: IssueModalData) {
    await this.typeList.click();
    await this.listOptions.filter({ hasText: options.type }).click();

    await this.activeCombobox.fill(options.active);
    await this.listOptions.filter({ hasText: options.active }).click();
  }

  async save() {
    await this.saveButton.click();
  }

  async buildIssueModalData() {
    const artifact = await new ArtifactCardPage(this.page).createArtifact();

    return {
      type: 'SCA',
      active: artifact.name,
    };
  }

  async initializeIssueCreationFromModal(issueData?: IssueModalData) {
    const data: IssueModalData = issueData ?? (await this.buildIssueModalData());

    await this.open();
    await this.add();
    await this.fillMainFields(data);
    await this.save();

    return data;
  }
}
