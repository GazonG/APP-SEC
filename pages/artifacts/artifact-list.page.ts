import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class ArtifactListPage extends BasePage {
  protected PAGE_URL = '#/assets/artifacts';
  protected TITLE = 'Активы';
}
