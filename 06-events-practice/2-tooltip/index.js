class Tooltip {
  static instance = null;
  element = null;
  DEFAULT_TOOLTIP_CSS_OFFSET = 5;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  onDocumentPointerover = event => {
    const tooltipText = event.target.dataset.tooltip;

    if (!tooltipText) {
      return;
    }

    this.render(tooltipText);
  };

  onDocumentPointermove = event => {
    if (event.target.dataset.tooltip) {
      this.element.style.left = event.pageX + this.DEFAULT_TOOLTIP_CSS_OFFSET + 'px';
      this.element.style.top = event.pageY + this.DEFAULT_TOOLTIP_CSS_OFFSET + 'px';
    }
  };

  onDocumentPointerout = event => {
    if (!event.target.dataset.tooltip) {
      this.element.style.visibility = 'hidden';
    }
  };

  addEventListeners() {
    document.addEventListener('pointerover', this.onDocumentPointerover);
    document.addEventListener('pointermove', this.onDocumentPointermove);
    document.addEventListener('pointerout', this.onDocumentPointerout);
  }

  removeEventListeners() {
    document.removeEventListener('pointerover', this.onDocumentPointerover);
    document.removeEventListener('pointermove', this.onDocumentPointermove);
    document.removeEventListener('pointerout', this.onDocumentPointerout);
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

    this.addEventListeners();
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
