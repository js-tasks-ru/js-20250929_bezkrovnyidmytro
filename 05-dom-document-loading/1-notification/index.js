export default class NotificationMessage {
  element = null;
  message = '';
  duration = 3000;
  type = '';
  static instances = [];

  constructor(message, { duration = 3000, type = 'success' } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = this.createElement();

    NotificationMessage.instances.push(this.element);
  }

  show(target) {
    NotificationMessage.instances.forEach(element => element.remove());

    const targetEl = target || document.body;
    targetEl.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  createElement() {
    if (!this.message) {
      return null;
    }

    const notification = document.createElement('div');
    notification.classList.add('notification', this.type);
    notification.style.setProperty('--value', (this.duration / 1000) + 's');

    const timer = document.createElement('div');
    timer.classList.add('timer');

    const innerWrapper = document.createElement('div');
    innerWrapper.classList.add('inner-wrapper');

    const header = document.createElement('div');
    header.classList.add('notification-header');
    header.textContent = this.type;

    const body = document.createElement('div');
    body.classList.add('notification-body');
    body.textContent = this.message;

    innerWrapper.appendChild(header);
    innerWrapper.appendChild(body);
    notification.appendChild(timer);
    notification.appendChild(innerWrapper);

    return notification;
  }

  destroy() {
    NotificationMessage.instances.forEach(element => element.remove());
    NotificationMessage.instances = [];
  }
}
