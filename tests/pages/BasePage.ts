import { Page } from '@playwright/test';
import { Header } from '../components/Header';

export class BasePage {
  readonly header: Header;

  constructor(readonly page: Page) {
    this.header = new Header(page);
  }
}
