import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  sorted = null;
  isSortLocally = true;

  constructor(headersConfig, { data = [], sorted = {} } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;

    this.addSortArrowToDefault(sorted.id);
    this.sort(sorted.id, sorted.order);

    this.addEventListeners();
  }

  addSortArrowToDefault(id) {
    this.element
      .querySelector(`[data-element="header"] [data-id="${id}"]`)
      ?.appendChild(this.arrowElement);
  }

  onHeaderClick = (event) => {
    const cellElement = event.target.closest('.sortable-table__cell');

    if (!cellElement || cellElement.dataset.sortable !== "true") {
      return;
    }

    const sortField = cellElement.dataset.id;
    const sortOrder = cellElement.dataset.order === 'desc' ? 'asc' : 'desc';

    cellElement.dataset.order = sortOrder;

    cellElement.appendChild(this.arrowElement);

    this.sort(sortField, sortOrder);
  };

  sort(sortBy, sortOrder) {
    if (this.isSortLocally) {
      this.sortOnClient(sortBy, sortOrder);
    } else {
      this.sortOnServer(sortBy, sortOrder);
    }
  }

  sortOnClient(sortBy, sortOrder) {
    super.sort(sortBy, sortOrder);
  }

  sortOnServer(sortBy, sortOrder) {
    super.sort(sortBy, sortOrder);
  }

  addEventListeners() {
    this.subElements.header.addEventListener("pointerdown", this.onHeaderClick);
  }

  removeEventListeners() {
    this.subElements.header.removeEventListener("pointerdown", this.onHeaderClick);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}
