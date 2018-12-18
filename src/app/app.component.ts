import { Component } from '@angular/core';
import { internet } from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
  * Список отображаемых email
  */
  emails: string[] = [];

  /**
   * Добавление случайного email в список
   */
  addRandomEmail() {
      this.emails = [...this.emails, internet.email()];
  }

  /**
   * Отображение длины списка email в alert
   */
  showEmailCnt() {
      alert(this.emails.length);
  }

  /**
   * Добавление emails в список (из компонента)
   */
  addEmails(emails: string[]) {
      this.emails = [...this.emails, ...emails];
  }

  /**
   * Удаление email (из компонента)
   */
  removeEmail(item: { index: number, value: string }) {
      const index = item.index;
      this.emails = [...this.emails.slice(0, index), ...this.emails.slice(index + 1)];
  }
}
