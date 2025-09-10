import { Page, test } from '@playwright/test';
import { ArtifactListPage } from '../../../pages/artifacts/artifact-list.page';

test.describe('Карточка артефакта', () => {
  let artifactListPage: ArtifactListPage;

  test.beforeEach(async ({ page }) => {
    artifactListPage = new ArtifactListPage(page);
  });

  test('Создание артефакта', async ({ page }) => {
    await artifactListPage.open();

    await page.waitForTimeout(3000);
  });
});
