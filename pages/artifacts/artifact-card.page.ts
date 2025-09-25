import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { IssueModalData } from '../issues/issues-list.page';
import { IssueCardData, IssueCardPage } from '../issues/issues-card.page';

interface ArtifactData {
  name: string;
  type: string;
  externalSystem: string;
}

export class ArtifactCardPage extends BasePage {
  protected PAGE_URL = '#/assets/artifacts/create';
  protected TITLE = 'Создание артефакта';

  protected artifactData: ArtifactData = {
    name: `TestArtifact-${Date.now()}`,
    type: 'Образ Docker',
    externalSystem: 'Prod JfrogZin',
  };

  get nameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'название' });
  }

  get typeList(): Locator {
    return this.page.getByLabel('тип артефакта');
  }

  get listOptions(): Locator {
    return this.page.locator('[role="option"]');
  }

  get externalSystemList(): Locator {
    return this.page.getByLabel('внешняя система');
  }

  get saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Сохранить' });
  }

  get addButton(): Locator {
    return this.page.locator('svg path[d="M11 11H5v2h6v6h2v-6h6v-2h-6V5h-2v6z"]');
  }

  get issuesTabButton(): Locator {
    return this.page.getByTestId('issues-tab-toggle');
  }

  async fillCardFields(options: ArtifactData) {
    await this.nameInput.fill(options.name);

    await this.typeList.click();
    await this.listOptions.filter({ hasText: options.type }).first().click();

    await this.externalSystemList.click();
    await this.listOptions.filter({ hasText: options.externalSystem }).first().click();
  }

  async save() {
    await this.saveButton.click();
  }

  async add() {
    await this.addButton.click();
  }

  async openIssuesTab() {
    await this.issuesTabButton.click();
  }

  async createArtifact(data: ArtifactData = this.artifactData) {
    await this.open();

    await this.fillCardFields(data);

    await this.save();

    return data;
  }

  async initializeIssueCreationFromModal(): Promise<IssueModalData> {
    const artifact = await this.createArtifact();

    await this.openIssuesTab();

    await this.add();

    await this.save();

    return { type: 'SCA', active: artifact.name };
  }

  async createIssue(issueCardData?: IssueCardData) {
    const issuesCard = new IssueCardPage(this.page);
    const data: IssueCardData = issueCardData ?? issuesCard.buildIssueCardData();

    const issueModalData = await this.initializeIssueCreationFromModal();
    await issuesCard.fillMainFields(data);
    await issuesCard.save();

    return { ...issueModalData, ...data };
  }
}
