import { expect, test } from '@playwright/test';
import { AuthPage } from '../../pages/auth.page';
import { ArtifactListPage } from '../../pages/artifacts/artifact-list.page';

test.describe('Страница авторизации', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
  });

  test('Авторизация с валидными учетными данными', async ({ page }) => {
    await authPage.open();

    await authPage.fillLoginFields();
    await authPage.singIn();

    await expect(new ArtifactListPage(page).title).toBeVisible();
  });

  test('Ошибка авторизации с невалидными учетными данными', async () => {
    await authPage.open();

    await authPage.fillLoginFields('Invalid username', 'Invalid password');
    await authPage.singIn();

    await authPage.expectInvalidLoginError();
  });

  test('Ошибка авторизации с незаполненными учетными данными', async () => {
    await authPage.open();

    await authPage.singIn();

    await authPage.expectInvalidLoginError();
  });

  test('Работа кнопки отображения пароля', async () => {
    const password = 'Password';

    await authPage.open();

    await authPage.fillLoginFields('', password);
    await authPage.showPassword();

    await expect.soft(authPage.passwordInput).toHaveValue(password);
  });
});
