import { expect, Page, test } from '@playwright/test';
import { ArtifactCardPage } from '../../../pages/artifacts/artifact-card.page';
import { ArtifactListPage } from '../../../pages/artifacts/artifact-list.page';

test.describe('Карточка артефакта', () => {
  let artifactCardPage: ArtifactCardPage;
  let artifactListPage: ArtifactListPage;

  test.beforeEach(async ({ page }) => {
    artifactCardPage = new ArtifactCardPage(page);
    artifactListPage = new ArtifactListPage(page);
  });

  test('Создание артефакта', async ({ page }) => {
    // await artifactListPage.open();
    await artifactCardPage.open();

    // await page.waitForTimeout(2000);

    await expect(artifactCardPage.title).toBeVisible();
  });
});
