class Viewcontroller {
  pages = {
    login: document.querySelector('.login'),
    registration: document.querySelector('.registration'),
  };

  hiddenClassName = 'd-none';

  /**
   *
   * @param {'login'||'registration'} page
   */
  openPage(page) {
    Object.entries(this.pages).forEach(([key, value]) => {
      if (key === page) return;
      value.classList.add(this.hiddenClassName);
    });
    this.pages[page].classList.remove(this.hiddenClassName);
  }

  /**
   *
   * @param {'login'|'registration'} page
   * @param {string} alertMessage
   */
  showAlert(page, alertMessage) {
    const alertElem = this.pages[page].querySelector('.alert');
    alertElem.classList.remove(this.hiddenClassName);
    alertElem.innerText = alertMessage;
  }

  hideAlert(page) {
    const alertElem = this.pages[page].querySelector('.alert');

    alertElem.classList.add(this.hiddenClassName);
    alertElem.innerText = '';
  }
}

export const viewcontroller = new Viewcontroller();
