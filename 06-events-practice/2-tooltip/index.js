class Tooltip {
  static instance = null;
  element = null;
  elements = [];
  DEFAULT_TOOLTIP_CSS_OFFSET = 5;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  onTextPointerover = () => {
    this.element.style.visibility = 'visible';
  };

  onTextPointermove = event => {
    const tooltipText = event.target.dataset.tooltip;

    if (!tooltipText) {
      return;
    }

    this.element.textContent = tooltipText;
    this.element.style.left = event.pageX + this.DEFAULT_TOOLTIP_CSS_OFFSET + 'px';
    this.element.style.top = event.pageY + this.DEFAULT_TOOLTIP_CSS_OFFSET + 'px';
  };

  onTextPointerout = () => {
    this.element.style.visibility = 'hidden';
  };

  getTooltipElements() {
    const elements = document.querySelectorAll('[data-tooltip]');

    if (!elements || !elements.length) {
      return [];
    }

    return elements;
  }

  addEventListeners() {
    this.elements.forEach(el => {
      el.addEventListener('pointerover', this.onTextPointerover);
      el.addEventListener('pointermove', this.onTextPointermove);
      el.addEventListener('pointerout', this.onTextPointerout);
    });
  }

  removeEventListeners() {
    this.elements.forEach(el => {
      el.removeEventListener('pointerover', this.onTextPointerover);
      el.removeEventListener('pointermove', this.onTextPointermove);
      el.removeEventListener('pointerout', this.onTextPointerout);
    });
  }

  destroy() {
    this.removeEventListeners();
    this.remove();
  }

  initialize() {
    if (!this.element) {
      this.element = this.createElement();
      document.body.appendChild(this.element);
    }

    this.elements = this.getTooltipElements();

    if (this.elements && this.elements.length) {
      this.addEventListeners();
    }
  }

  createElement() {
    const el = document.createElement('div');
    el.classList.add('tooltip');
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    return el;
  }

  render(tooltipText = '') {
    this.element.style.visibility = 'visible';
    this.element.textContent = tooltipText;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
}

export default Tooltip;
