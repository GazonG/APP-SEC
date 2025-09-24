import { expect, test } from '@playwright/test';
import { IssueCardPage, CalculatorOptionData } from '../../pages/issues/issues-card.page';

const cases: Array<{
  name: string;
  expectedScore: string;
  expectedClass: RegExp;
  options: CalculatorOptionData;
}> = [
  {
    name: 'максимальная критичность',
    expectedScore: '10.0',
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

      await test.step('Создание уязвимости', async () => {
        await issueCard.createIssue();
      });

      await test.step('Расчет критичности через калькулятор', async () => {
        await issueCard.calculateScore(c.options);
      });

      await test.step('Проверка рассчитанного бала и класса', async () => {
        await expect(issueCard.scoreValueElement).toHaveText(c.expectedScore);
        await expect(issueCard.scoreValueElement).toHaveClass(c.expectedClass);
      });
    });
  }
});
