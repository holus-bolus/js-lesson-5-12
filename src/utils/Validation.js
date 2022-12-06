import { isEmail } from 'validator/lib/isEmail';
import { isStrongPassword } from 'validator/lib/isStrongPassword';

/**
 * @property {HTMLFormElement} form
 */

export class Validation {
  form;
  callback;

  /**
   *
   * @param {HTMLFormElement} form
   * @param {Function} callback
   */
  constructor(form, callback) {
    this.form = form;
    this.callback = callback;
    this.initHandlers();
  }

  initHandlers() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      const isValid = [...this.form.elements].reduce((acc, curr) => {
        if (!curr.matches('input')) {
          const result = this.validate(curr);
          return !acc ? acc : result;
        }
      }, true);
      if (isValid) {
        this.callback();
      }
    });
    this.form.addEventListener('change', ({ target }) => {
      if (target.matches('input')) {
        this.validate(target);
      }
    });
  }

  /**
   *
   * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input
   */
  validate(input) {
    const { value, type, required, minLength, maxLength } = input;
    const errorMessage = input.nextElementSibling;

    function makeError(text) {
      input.classList.add('is-invalid');
      errorMessage.innerText = text;
      errorMessage.classList.add('invalid-feedback');
    }

    function makeSuccess() {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      errorMessage.classList.remove('invalid-feedback');
      errorMessage.innerText = '';
    }

    if (!required && value === '') {
      makeSuccess();
      return true;
    }
    if (required && value === '') {
      makeError('This field is required');
      return false;
    }

    if (minLength && minLength > value.length) {
      makeError(`This field should have minimum ${minLength} symbols`);
      return false;
    }
    if (maxLength && maxLength < value.length) {
      makeError(`This field should have maximum ${maxLength} symbols`);
      return false;
    }
    if (type === 'email' && isEmail(value)) {
      makeError(`This field should be a valid email`);
      return false;
    }
    if (type === 'password' && !isStrongPassword(value)) {
      makeError(
        `The password should contain at least 1 number, 1 uppercase letter and at least 1 special symbol`
      );
      return false;
    }
    makeSuccess();
    return true;
  }
}
