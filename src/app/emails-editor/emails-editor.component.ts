import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'emails-editor',
  templateUrl: './emails-editor.component.html',
  styleUrls: ['./emails-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailsEditorComponent implements OnChanges {

  // tslint:disable-next-line:max-line-length
  readonly EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  /**
   * Placeholder для поля ввода email
   */
  @Input() placeholder: string;

  /**
   * Список email
   */
  @Input() emails: string[];

  /**
   * Добавление emails из поля ввода
   */
  @Output() addEmails = new EventEmitter<string[]>();

  /**
   * Удаление email
   */
  @Output() removeEmail = new EventEmitter<{ index: number, value: string }>();

  /**
   * Статусы алидности email
   */
  private emailValidationStates: boolean[];

  /**
   * Максимально допустимая ширина отображаемого текста email блока
   */
  private emailTextMaxWidth: number;

  /**
   * Валидация email
   */
  private _validateEmail(email: string): boolean {
    return this.EMAIL_REGEXP.test(email);
  }

  /**
   * Удаление email из списка по индексу
   */
  rmEmail(index: number) {
      this.removeEmail.emit({
          index: index,
          value: this.emails[index],
      });
  }

  /**
   * Добавление email в список и очистка поля ввода
   */
  addEmail(e, elem) {
    e.preventDefault();
    const email = elem.value.trim();
    if (email.length > 0) {
        this.addEmails.emit([email]);
    }
    elem.value = '';
  }

  /**
   * Добавление email при вставке
   */
  onPaste(e) {
    e.preventDefault();
    const data = e.clipboardData.getData('text/plain');
    this.addEmails.emit(
      data.split(',')
        .map(str => str.trim())
        .filter(str => str.length > 0)
    );
  }

  /**
   * Добавление email при нажатии "Enter" или ","
   */
  onKeydown(e, elem) {
    if (e.key === 'Enter' || e.key === ',') {
      this.addEmail(e, elem);
    }
  }

  /**
   * Изменение макс. ширины текста email блока при изменении ширины контейнера
   */
  onResize(width) {
    this.emailTextMaxWidth = width - 80;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.emails) {
      this.emailValidationStates = changes.emails.currentValue.map(str => this._validateEmail(str));
    }
  }
}
