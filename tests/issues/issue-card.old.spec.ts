// import { expect, Page, test } from '@playwright/test';
// import { IssuesListPage } from '../../pages/issues/issues-list.page';
// import { CalculatorOptionData, IssueCardPage } from '../../pages/issues/issues-card.page';

// test.describe('Карточка уязвимости', () => {
//   let issueList: IssuesListPage;
//   let issueCard: IssueCardPage;

//   test.beforeEach(async ({ page }) => {
//     issueList = new IssuesListPage(page);
//     issueCard = new IssueCardPage(page);
//   });

//   test('Расчет максимальной критичности при помощи калькулятора', async () => {
//     const expectedScore = '10.0';
//     const expectedClass = /issue_critical/;

//     const calculatorOptions: CalculatorOptionData = {
//       attackVector: 'Сетевой (N)',
//       attackDifficulty: 'Низкая (L)',
//       attackRequirements: 'Отсутствуют (N)',
//       privilegesRequired: 'Не требуется (N)',
//       userInteraction: 'Не требуется (N)',

//       confidentialityImpact: 'Высокое (H)',
//       integrityImpact: 'Высокое (H)',
//       availabilityImpact: 'Высокое (H)',

//       secondaryConfidentialityImpact: 'Высокое (H)',
//       secondaryIntegrityImpact: 'Высокое (H)',
//       secondaryAvailabilityImpact: 'Высокое (H)',
//     };

//     await test.step('Создание уязвимости', async () => {
//       await issueCard.createIssue();
//     });

//     await test.step('Расчет критичности через калькулятор', async () => {
//       await issueCard.calculateScore(calculatorOptions);
//     });

//     await test.step('Проверка рассчитанного бала и класса', async () => {
//       await expect.soft(issueCard.scoreValueElement).toHaveText(expectedScore);
//       await expect.soft(issueCard.scoreValueElement).toHaveClass(expectedClass);
//     });
//   });

//   test('Расчет высокой критичности при помощи калькулятора', async () => {
//     const expectedScore = '8.4';
//     const expectedClass = /issue_high/;

//     const calculatorOptions: CalculatorOptionData = {
//       attackVector: 'Сетевой (N)',
//       attackDifficulty: 'Низкая (L)',
//       attackRequirements: 'Отсутствуют (N)',
//       privilegesRequired: 'Низкий (L)',
//       userInteraction: 'Пассивное (P)',

//       confidentialityImpact: 'Низкое (L)',
//       integrityImpact: 'Низкое (L)',
//       availabilityImpact: 'Высокое (H)',

//       secondaryConfidentialityImpact: 'Высокое (H)',
//       secondaryIntegrityImpact: 'Высокое (H)',
//       secondaryAvailabilityImpact: 'Не оказывает (N)',
//     };

//     await test.step('Создание уязвимости', async () => {
//       await issueCard.createIssue();
//     });

//     await test.step('Расчет критичности через калькулятор', async () => {
//       await issueCard.calculateScore(calculatorOptions);
//     });

//     await test.step('Проверка рассчитанного бала и класса', async () => {
//       await expect.soft(issueCard.scoreValueElement).toHaveText(expectedScore);
//       await expect.soft(issueCard.scoreValueElement).toHaveClass(expectedClass);
//     });
//   });

//   test('Расчет средней критичности при помощи калькулятора', async () => {
//     const expectedScore = '5.9';
//     const expectedClass = /issue_medium/;

//     const calculatorOptions: CalculatorOptionData = {
//       attackVector: 'Смежный (A)',
//       attackDifficulty: 'Высокая (H)',
//       attackRequirements: 'Существуют (P)',
//       privilegesRequired: 'Низкий (L)',
//       userInteraction: 'Пассивное (P)',

//       confidentialityImpact: 'Низкое (L)',
//       integrityImpact: 'Низкое (L)',
//       availabilityImpact: 'Высокое (H)',

//       secondaryConfidentialityImpact: 'Высокое (H)',
//       secondaryIntegrityImpact: 'Высокое (H)',
//       secondaryAvailabilityImpact: 'Не оказывает (N)',
//     };

//     await test.step('Создание уязвимости', async () => {
//       await issueCard.createIssue();
//     });

//     await test.step('Расчет критичности через калькулятор', async () => {
//       await issueCard.calculateScore(calculatorOptions);
//     });

//     await test.step('Проверка рассчитанного бала и класса', async () => {
//       await expect.soft(issueCard.scoreValueElement).toHaveText(expectedScore);
//       await expect.soft(issueCard.scoreValueElement).toHaveClass(expectedClass);
//     });
//   });

//   test('Расчет низкой критичности при помощи калькулятора', async () => {
//     const expectedScore = '2.1';
//     const expectedClass = /issue_low/;

//     const calculatorOptions: CalculatorOptionData = {
//       attackVector: 'Физический (P)',
//       attackDifficulty: 'Высокая (H)',
//       attackRequirements: 'Существуют (P)',
//       privilegesRequired: 'Высокий (H)',
//       userInteraction: 'Активное (A)',

//       confidentialityImpact: 'Не оказывает (N)',
//       integrityImpact: 'Не оказывает (N)',
//       availabilityImpact: 'Не оказывает (N)',

//       secondaryConfidentialityImpact: 'Не оказывает (N)',
//       secondaryIntegrityImpact: 'Высокое (H)',
//       secondaryAvailabilityImpact: 'Высокое (H)',
//     };

//     await test.step('Создание уязвимости', async () => {
//       await issueCard.createIssue();
//     });

//     await test.step('Расчет критичности через калькулятор', async () => {
//       await issueCard.calculateScore(calculatorOptions);
//     });

//     await test.step('Проверка рассчитанного бала и класса', async () => {
//       await expect.soft(issueCard.scoreValueElement).toHaveText(expectedScore);
//       await expect.soft(issueCard.scoreValueElement).toHaveClass(expectedClass);
//     });
//   });

//   test('Расчет минимальной критичности при помощи калькулятора', async () => {
//     const expectedScore = '0.0';
//     const expectedClass = /issue_none/;

//     const calculatorOptions: CalculatorOptionData = {
//       attackVector: 'Физический (P)',
//       attackDifficulty: 'Высокая (H)',
//       attackRequirements: 'Существуют (P)',
//       privilegesRequired: 'Высокий (H)',
//       userInteraction: 'Активное (A)',

//       confidentialityImpact: 'Не оказывает (N)',
//       integrityImpact: 'Не оказывает (N)',
//       availabilityImpact: 'Не оказывает (N)',

//       secondaryConfidentialityImpact: 'Не оказывает (N)',
//       secondaryIntegrityImpact: 'Не оказывает (N)',
//       secondaryAvailabilityImpact: 'Не оказывает (N)',
//     };

//     await test.step('Создание уязвимости', async () => {
//       await issueCard.createIssue();
//     });

//     await test.step('Расчет критичности через калькулятор', async () => {
//       await issueCard.calculateScore(calculatorOptions);
//     });

//     await test.step('Проверка рассчитанного бала и класса', async () => {
//       await expect.soft(issueCard.scoreValueElement).toHaveText(expectedScore);
//       await expect.soft(issueCard.scoreValueElement).toHaveClass(expectedClass);
//     });
//   });
// });
