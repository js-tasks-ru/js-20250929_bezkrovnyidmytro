export default class SortableTable {
  headerConfig = [];
  data = [];
  element = null;
  arrowElement = null;
  subElements = null;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.arrowElement = this.createHeaderSortArrowElement();
    this.element = this.createElement();
  }

  getItemValue(sortBy, element) {
    const el = element.querySelector(`div[data-key="${sortBy}"]`);
    const elContent = el ? el.textContent.trim() : '';

    if (!isNaN(elContent)) {
      return parseFloat(elContent);
    }

    return elContent;
  }

  sort(sortBy, sortOrder) {
    const sortOrderMultiplier = sortOrder === 'asc' ? 1 : -1;
    const sortItems = Array.from(this.subElements.body.querySelectorAll('a.sortable-table__row'));

    sortItems.sort((item1, item2) => {
      const value1 = this.getItemValue(sortBy, item1);
      const value2 = this.getItemValue(sortBy, item2);

      if (typeof value1 === "string" && typeof value2 === "string") {
        return sortOrderMultiplier * value1.localeCompare(value2, ['ru', 'en'], {caseFirst: "upper"});
      }

      if (value1 < value2) {
        return -1 * sortOrderMultiplier;
      }
      if (value1 > value2) {
        return 1 * sortOrderMultiplier;
      }
      return 0;
    });

    const tableBody = this.element.querySelector('div[data-element="body"]');
    tableBody.innerHTML = '';

    sortItems.forEach(item => {
      tableBody.appendChild(item);
    });

    this.subElements.body = tableBody;
  }

  createElement() {
    const container = this.createTableContainer();
    const header = this.createTableHeader();
    const body = this.createTableBody();
    const emptyBody = this.createTableEmptyBody();
    const loader = this.createTableLoader();

    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(emptyBody);
    container.appendChild(loader);

    this.subElements = {
      header: header,
      body: body,
      emptyBody: emptyBody,
      loader: loader,
    };

    return container;
  }

  createTableContainer() {
    const container = document.createElement('div');
    container.setAttribute('data-element', 'productsContainer');
    container.classList.add('products-list__container');

    const innerWrapper = document.createElement('div');
    innerWrapper.classList.add('sortable-table');

    container.appendChild(innerWrapper);
    return container;
  }

  createTableHeader() {
    const header = document.createElement('div');
    header.setAttribute('data-element', 'header');
    header.classList.add('sortable-table__header');
    header.classList.add('sortable-table__row');

    this.headerConfig.forEach(item => {
      const itemEl = this.createHeaderItemElement(item);
      header.appendChild(itemEl);
    });

    return header;
  }

  createHeaderItemElement(item) {
    const el = document.createElement('div');
    el.setAttribute('data-id', item.id);
    el.classList.add('sortable-table__cell');

    const title = document.createElement('span');
    title.textContent = item.title;

    el.appendChild(title);

    if (item.sortable) {
      el.setAttribute('data-sortable', item.sortable);
      el.appendChild(this.arrowElement);
    }

    return el;
  }

  createHeaderSortArrowElement() {
    const el = document.createElement('span');
    el.setAttribute('data-element', 'arrow');
    el.classList.add('sortable-table__sort-arrow');

    const innerEl = document.createElement('span');
    innerEl.classList.add('sort-arrow');

    el.append(innerEl);

    return el;
  }

  createTableBody() {
    const tableBody = document.createElement('div');
    tableBody.setAttribute('data-element', 'body');
    tableBody.classList.add('sortable-table__body');

    this.data.forEach(item => {
      const itemEl = this.createTableBodyElement(item);
      tableBody.appendChild(itemEl);
    });

    return tableBody;
  }

  createTableBodyElement(item) {
    const el = document.createElement('a');
    el.classList.add('sortable-table__row');
    el.href = '/products/' + item.id;

    this.headerConfig.forEach(headerItem => {
      const key = headerItem.id;

      if (item.hasOwnProperty(key)) {
        const productEl = key === 'images'
          ? this.createProductItemImage(item)
          : this.createProductItemText(item, key);
        el.appendChild(productEl);
      }
    });

    return el;
  }

  createProductItemImage(item) {
    const el = document.createElement('div');
    el.classList.add('sortable-table__cell');

    const image = document.createElement('img');
    image.classList.add('sortable-table-image');
    image.setAttribute('alt', item.title);
    image.setAttribute('src', 'https://i.imgur.com/MCdw6u2.jpg');

    el.appendChild(image);

    return el;
  }

  createProductItemText(item, key) {
    const el = document.createElement('div');
    el.classList.add('sortable-table__cell');
    el.setAttribute('data-key', key);
    el.textContent = item[key];
    return el;
  }

  createTableEmptyBody() {
    const emptyPlaceholderDiv = document.createElement('div');
    emptyPlaceholderDiv.setAttribute('data-element', 'emptyPlaceholder');
    emptyPlaceholderDiv.classList.add('sortable-table__empty-placeholder');

    const innerDiv = document.createElement('div');

    const p = document.createElement('p');
    p.textContent = 'No products satisfy your filter criteria';

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('button-primary-outline');
    button.textContent = 'Reset all filters';

    innerDiv.appendChild(p);
    innerDiv.appendChild(button);

    emptyPlaceholderDiv.appendChild(innerDiv);

    return emptyPlaceholderDiv;
  }

  createTableLoader() {
    const el = document.createElement("div");
    el.setAttribute('data-element', 'loading');
    el.classList.add('loading-line');
    el.classList.add('sortable-table__loading-line');
    return el;
  }

  destroy() {
    this.element.remove();
  }
}

