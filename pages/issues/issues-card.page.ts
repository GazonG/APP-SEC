import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { IssueModalData, IssuesListPage } from './issues-list.page';
import { ArtifactCardPage } from '../artifacts/artifact-card.page';

export interface IssueCardData {
  name: string;
  scanner: string;
  criticalLevel: string;
  location: string;
  description: string;
  recommendations: string;
}

export interface CalculatorOptionData {
  attackVector: 'Сетевой (N)' | 'Смежный (A)' | 'Локальный (L)' | 'Физический (P)';
  attackDifficulty: 'Низкая (L)' | 'Высокая (H)';
  attackRequirements: 'Отсутствуют (N)' | 'Существуют (P)';
  privilegesRequired: 'Не требуется (N)' | 'Низкий (L)' | 'Высокий (H)';
  userInteraction: 'Не требуется (N)' | 'Пассивное (P)' | 'Активное (A)';

  confidentialityImpact: 'Высокое (H)' | 'Низкое (L)' | 'Не оказывает (N)';
  integrityImpact: 'Высокое (H)' | 'Низкое (L)' | 'Не оказывает (N)';
  availabilityImpact: 'Высокое (H)' | 'Низкое (L)' | 'Не оказывает (N)';

  secondaryConfidentialityImpact: 'Высокое (H)' | 'Низкое (L)' | 'Не оказывает (N)';
  secondaryIntegrityImpact: 'Высокое (H)' | 'Низкое (L)' | 'Не оказывает (N)';
  secondaryAvailabilityImpact: 'Высокое (H)' | 'Низкое (L)' | 'Не оказывает (N)';
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

  get scoreElement(): Locator {
    return this.page
      .locator('.complex-action-button_containerL__MT98q')
      .filter({ hasText: 'оценка' });
  }

  get scoreValueElement(): Locator {
    return this.scoreElement.locator('.typography__component_1nsnz');
  }

  get editScoreButton(): Locator {
    return this.scoreElement.locator('button');
  }

  get useCalculatorSwitch(): Locator {
    return this.page.locator('label').filter({ hasText: 'Использовать калькулятор критичности' });
  }

  get listOptions(): Locator {
    return this.page.locator('[role="option"]');
  }

  get baseMetricsAccordion(): Locator {
    return this.page.getByRole('heading', { name: 'Базовые метрики', exact: true });
  }

  get attackVectorBlock(): Locator {
    return this.page.locator('.radio-group__component_1b7e3').filter({ hasText: 'Вектор атаки' });
  }

  get attackDifficultyBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Сложность атаки' });
  }

  get attackRequirementsBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Требования к атаке' });
  }

  get privilegesRequiredBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Уровень привилегий' });
  }

  get userInteractionBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Взаимодействие с пользователем' });
  }

  get confidentialityImpactBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Влияние на конфиденциальность' });
  }

  get integrityImpactBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Влияние на целостность' });
  }

  get availabilityImpactBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Влияние на доступность' });
  }

  get secondaryConfidentialityImpactBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Влияние на конфиденциальность (SC)' });
  }

  get secondaryIntegrityImpactBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Влияние на целостность (SI)' });
  }

  get secondaryAvailabilityImpactBlock(): Locator {
    return this.page
      .locator('.radio-group__component_1b7e3')
      .filter({ hasText: 'Влияние на доступность (SA)' });
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

  async editScore() {
    await this.editScoreButton.click();
  }

  async useCalculator() {
    await this.useCalculatorSwitch.click();
  }

  async openBaseMetrics() {
    await this.baseMetricsAccordion.click();
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

  // async createIssue(issueModalData?: IssueModalData, issueCardData?: IssueCardData) {
  //   const issuesList = new IssuesListPage(this.page);
  //   const data: IssueCardData = issueCardData ?? this.buildIssueCardData();

  //   await issuesList.initializeIssueCreationFromModal(issueModalData);
  //   await this.fillMainFields(data);
  //   await this.save();

  //   return { ...issueModalData, ...data };
  // }

  async createIssue(issueCardData?: IssueCardData) {
    const artifactCard = new ArtifactCardPage(this.page);
    const data: IssueCardData = issueCardData ?? this.buildIssueCardData();

    const issueModalData = await artifactCard.initializeIssueCreationFromModal();
    await this.fillMainFields(data);
    await this.save();

    return { ...issueModalData, ...data };
  }

  async selectCalculatorOptions(o: CalculatorOptionData) {
    await this.attackVectorBlock
      .locator('button')
      .filter({ hasText: o.attackVector })
      .first()
      .click();

    await this.attackDifficultyBlock
      .locator('button')
      .filter({ hasText: o.attackDifficulty })
      .first()
      .click();

    await this.attackRequirementsBlock
      .locator('button')
      .filter({ hasText: o.attackRequirements })
      .first()
      .click();

    await this.privilegesRequiredBlock
      .locator('button')
      .filter({ hasText: o.privilegesRequired })
      .first()
      .click();

    await this.userInteractionBlock
      .locator('button')
      .filter({ hasText: o.userInteraction })
      .first()
      .click();

    await this.confidentialityImpactBlock
      .locator('button')
      .filter({ hasText: o.confidentialityImpact })
      .first()
      .click();

    await this.integrityImpactBlock
      .locator('button')
      .filter({ hasText: o.integrityImpact })
      .first()
      .click();

    await this.availabilityImpactBlock
      .locator('button')
      .filter({ hasText: o.availabilityImpact })
      .first()
      .click();

    await this.secondaryConfidentialityImpactBlock
      .locator('button')
      .filter({ hasText: o.secondaryConfidentialityImpact })
      .first()
      .click();

    await this.secondaryIntegrityImpactBlock
      .locator('button')
      .filter({ hasText: o.secondaryIntegrityImpact })
      .first()
      .click();

    await this.secondaryAvailabilityImpactBlock
      .locator('button')
      .filter({ hasText: o.secondaryAvailabilityImpact })
      .first()
      .click();
  }

  async calculateScore(calculatorOptions: CalculatorOptionData) {
    await this.editScore();

    await this.useCalculator();

    await this.openBaseMetrics();

    await this.selectCalculatorOptions(calculatorOptions);

    await this.save();
  }
}
