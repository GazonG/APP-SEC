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
    const artifact = await artifactCardPage.createArtifact();

    await expect(page.getByText(artifact.name).first()).toBeVisible();
  });
});
