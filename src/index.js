import './styles/index.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap';

import { Validation } from './utils/Validation';
import { loginUserRequest, registerUserRequest } from './api/script';
import { viewcontroller } from './utils/Viewcontroller';

document.addEventListener('DOMContentLoaded', () => {
  /**
   *
   * @type {HTMLFormElement}
   */
  const registrationForm = document.querySelector('.registration-form');
  /**
   *
   * @type {HTMLFormElement}
   */
  const loginForm = document.querySelector('.login-form');
  viewcontroller.openPage('login');
  new Validation(registrationForm, async () => {
    const body = new FormData(registrationForm);

    try {
      await registerUserRequest(body);
      await loginUserRequest(body);
      registrationForm.reset();
      viewcontroller.hideAlert('registration');
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      viewcontroller.showAlert('registration', message);
    }
  });
  new Validation(loginForm, async () => {
    const body = new FormData(loginForm);
    try {
      const {
        data: { token, email },
      } = await loginUserRequest(body);
      loginForm.reset();
      viewcontroller.hideAlert('login');
    } catch (error) {
      const {
        response: {
          data: { message },
        },
      } = error;
      viewcontroller.showAlert('login', message);
    }
  });
});
