import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

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

  async createArtifact(data: ArtifactData = this.artifactData) {
    await this.open();

    await this.fillCardFields(data);

    await this.save();

    return data;
  }
}
