export default class ColumnChart {
  element = null;
  data = null;
  label = null;
  value = null;
  link = null;
  linkLabel = null;
  formatHeading = null;
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = data => data
  } = {}) {
    this.data = this.getColumnProps(data);
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;

    this.element = this.createElement();
  }

  createElement() {
    const container = this.createContainerEl();
    const title = this.createTitleEl();
    const subtitle = this.createSubTitleEl();
    const charts = this.createCharts();

    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(charts);

    return container;
  }

  createContainerEl() {
    const el = document.createElement('div');
    el.classList.add('column-chart');

    if (!this.data || !this.data.length) {
      el.classList.add('column-chart_loading');
    }

    el.style.setProperty('--chart-height', String(this.chartHeight));
    return el;
  }

  createTitleEl() {
    const el = document.createElement('div');
    el.classList.add('column-chart__title');
    el.textContent = this.label || 'Element title';

    if (this.link) {
      const link = this.createLink();
      el.appendChild(link);
    }

    return el;
  }

  createLink() {
    const el = document.createElement('a');
    el.classList.add('column-chart__link');
    el.textContent = this.linkLabel || 'View all';
    el.href = this.link;
    return el;
  }

  createSubTitleEl() {
    const el = document.createElement('div');
    el.setAttribute('data-element', 'header');
    el.classList.add('column-chart__header');
    el.textContent = this.value
      ? (
        typeof this.formatHeading === 'function'
          ? this.formatHeading(this.value)
          : this.value
      )
      : '';
    return el;
  }

  createCharts(data) {
    const _data = data || this.data;
    const container = document.createElement('div');
    container.classList.add('column-chart__container');

    const chart = document.createElement('div');
    chart.setAttribute('data-element', 'body');
    chart.classList.add('column-chart__chart');

    if (_data) {
      _data.forEach(item => {
        const column = document.createElement('div');
        column.style.setProperty('--value', item.value);
        column.setAttribute('data-tooltip', item.percent);
        chart.appendChild(column);
      });
    }

    container.appendChild(chart);

    return container;
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  update(data) {
    if (!data) {
      return;
    }

    const newData = this.getColumnProps(data);
    const newCharts = this.createCharts(newData);

    this.replaceCharts(newCharts);

    return this;
  }

  replaceCharts(replace) {
    this.element.querySelector('.column-chart__container').replaceWith(replace);
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
