import { expect, test } from '@playwright/test';
import { IssueCardPage, CalculatorOptionData } from '../../pages/issues/issues-card.page';
import { ArtifactCardPage } from '../../pages/artifacts/artifact-card.page';

const cases: Array<{
  name: string;
  expectedScore: string;
  expectedClass: RegExp;
  expectedVector: string;
  options: CalculatorOptionData;
}> = [
  {
    name: 'максимальная критичность',
    expectedScore: '10.0',
    expectedVector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H',
    expectedClass: /issue_critical/,
    options: {
      attackVector: 'Сетевой (N)',
      attackDifficulty: 'Низкая (L)',
      attackRequirements: 'Отсутствуют (N)',
      privilegesRequired: 'Не требуется (N)',
      userInteraction: 'Не требуется (N)',
      confidentialityImpact: 'Высокое (H)',
      integrityImpact: 'Высокое (H)',
      availabilityImpact: 'Высокое (H)',
      secondaryConfidentialityImpact: 'Высокое (H)',
      secondaryIntegrityImpact: 'Высокое (H)',
      secondaryAvailabilityImpact: 'Высокое (H)',
    },
  },
  {
    name: 'высокая критичность',
    expectedScore: '8.4',
    expectedClass: /issue_high/,
    expectedVector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:L/UI:P/VC:L/VI:L/VA:H/SC:H/SI:H/SA:N',
    options: {
      attackVector: 'Сетевой (N)',
      attackDifficulty: 'Низкая (L)',
      attackRequirements: 'Отсутствуют (N)',
      privilegesRequired: 'Низкий (L)',
      userInteraction: 'Пассивное (P)',
      confidentialityImpact: 'Низкое (L)',
      integrityImpact: 'Низкое (L)',
      availabilityImpact: 'Высокое (H)',
      secondaryConfidentialityImpact: 'Высокое (H)',
      secondaryIntegrityImpact: 'Высокое (H)',
      secondaryAvailabilityImpact: 'Не оказывает (N)',
    },
  },
  {
    name: 'средняя критичность',
    expectedScore: '5.9',
    expectedClass: /issue_medium/,
    expectedVector: 'CVSS:4.0/AV:A/AC:H/AT:P/PR:L/UI:P/VC:L/VI:L/VA:H/SC:H/SI:H/SA:N',
    options: {
      attackVector: 'Смежный (A)',
      attackDifficulty: 'Высокая (H)',
      attackRequirements: 'Существуют (P)',
      privilegesRequired: 'Низкий (L)',
      userInteraction: 'Пассивное (P)',
      confidentialityImpact: 'Низкое (L)',
      integrityImpact: 'Низкое (L)',
      availabilityImpact: 'Высокое (H)',
      secondaryConfidentialityImpact: 'Высокое (H)',
      secondaryIntegrityImpact: 'Высокое (H)',
      secondaryAvailabilityImpact: 'Не оказывает (N)',
    },
  },
  {
    name: 'низкая критичность',
    expectedScore: '2.1',
    expectedClass: /issue_low/,
    expectedVector: 'CVSS:4.0/AV:P/AC:H/AT:P/PR:H/UI:A/VC:N/VI:N/VA:N/SC:N/SI:H/SA:H',
    options: {
      attackVector: 'Физический (P)',
      attackDifficulty: 'Высокая (H)',
      attackRequirements: 'Существуют (P)',
      privilegesRequired: 'Высокий (H)',
      userInteraction: 'Активное (A)',
      confidentialityImpact: 'Не оказывает (N)',
      integrityImpact: 'Не оказывает (N)',
      availabilityImpact: 'Не оказывает (N)',
      secondaryConfidentialityImpact: 'Не оказывает (N)',
      secondaryIntegrityImpact: 'Высокое (H)',
      secondaryAvailabilityImpact: 'Высокое (H)',
    },
  },
  {
    name: 'минимальная критичность',
    expectedScore: '0.0',
    expectedClass: /issue_none/,
    expectedVector: 'CVSS:4.0/AV:P/AC:H/AT:P/PR:H/UI:A/VC:N/VI:N/VA:N/SC:N/SI:N/SA:N',
    options: {
      attackVector: 'Физический (P)',
      attackDifficulty: 'Высокая (H)',
      attackRequirements: 'Существуют (P)',
      privilegesRequired: 'Высокий (H)',
      userInteraction: 'Активное (A)',
      confidentialityImpact: 'Не оказывает (N)',
      integrityImpact: 'Не оказывает (N)',
      availabilityImpact: 'Не оказывает (N)',
      secondaryConfidentialityImpact: 'Не оказывает (N)',
      secondaryIntegrityImpact: 'Не оказывает (N)',
      secondaryAvailabilityImpact: 'Не оказывает (N)',
    },
  },
];

test.describe('Карточка уязвимости — параметризованные проверки калькулятора', () => {
  for (const c of cases) {
    test(`Расчет критичности: ${c.name}`, async ({ page }) => {
      const issueCard = new IssueCardPage(page);
      const artifactCard = new ArtifactCardPage(page);

      await test.step('Создание уязвимости', async () => {
        await artifactCard.createIssue();
      });

      await test.step('Расчет критичности через калькулятор', async () => {
        await issueCard.calculateScore(c.options);
      });

      await test.step('Проверка рассчитанного бала и класса', async () => {
        await expect.soft(issueCard.scoreValueElement).toHaveText(c.expectedScore);
        await expect.soft(issueCard.scoreValueElement).toHaveClass(c.expectedClass);
        await expect.soft(issueCard.vectorElement).toHaveText(c.expectedVector);
      });
    });
  }
});
