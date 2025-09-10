import { test as setup } from '@playwright/test';
import path from 'path';
import { AuthPage } from '../../pages/auth.page';

const authFile = path.resolve(__dirname, '../..', '.auth', 'user.json');

setup('auth', async ({ page }) => {
  const authHelper = new AuthPage(page);

  await authHelper.open();
  await authHelper.fillLoginFields();
  await authHelper.singIn();

  await page.context().storageState({ path: authFile });
});
