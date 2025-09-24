import { expect, Page, test } from '@playwright/test';
import { IssuesListPage } from '../../pages/issues/issues-list.page';
import { IssueCardPage } from '../../pages/issues/issues-card.page';

test.describe('Карточка уязвимости', () => {
  let issueListPage: IssuesListPage;
  let issueCardPage: IssueCardPage;

  test.beforeEach(async ({ page }) => {
    issueListPage = new IssuesListPage(page);
    issueCardPage = new IssueCardPage(page);
  });

  test('Создание уязвимости', async ({ page }) => {
    const issue = await issueCardPage.createIssue();

    await page.waitForTimeout(10000);

    await expect(page.getByText(issue.name).first()).toBeVisible();
  });
});
