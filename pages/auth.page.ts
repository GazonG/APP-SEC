import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AuthPage extends BasePage {
  protected PAGE_URL = '/';
  protected TITLE = 'Sign in to your account';

  get title(): Locator {
    return this.page.locator('#kc-page-title').filter({ hasText: this.TITLE });
  }

  get userNameInput(): Locator {
    return this.page.locator('#username');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get singInButton(): Locator {
    return this.page.locator('#kc-login');
  }

  get inputError(): Locator {
    return this.page.locator('#input-error');
  }

  get showPasswordButton(): Locator {
    return this.page.locator('button[data-password-toggle]');
  }

  async fillLoginFields(
    userName: string = process.env.USER_LOGIN!,
    password: string = process.env.USER_PASSWORD!,
  ) {
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
  }

  async singIn() {
    await this.singInButton.click();
  }

  async expectInvalidLoginError() {
    await expect(this.inputError).toContainText('Invalid username or password.');
    await expect(this.title).toContainText('Sign in to your account');
  }

  async showPassword() {
    await this.showPasswordButton.click();
  }
}
