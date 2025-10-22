import defaultExport from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends defaultExport {
  sorted = null;
  sortableHeaderItems = null;
  isSortLocally = true;

  constructor(headersConfig, { data = [], sorted = {} } = {}) {
    super(headersConfig, data);
    this.element = super.getElement();
    this.sorted = sorted;
    this.sortableHeaderItems = this.getSortableHeaderElements();

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
    const parent = event.target.parentNode;

    parent.appendChild(this.arrowElement);

    const sortBy = parent.dataset.id;
    const sortOrder = parent.dataset.sortOrder;

    if (!sortOrder) {
      parent.dataset.sortOrder = "asc";
    } else {
      parent.dataset.sortOrder =
        parent.dataset.sortOrder === "asc" ? "desc" : "asc";
    }

    this.sort(sortBy, sortOrder);
  };

  getSortableHeaderElements() {
    const sortableHeaderItems = Array.from(
      this.subElements.header.querySelectorAll('[data-sortable="true"]')
    );

    console.log(sortableHeaderItems);

    return sortableHeaderItems && sortableHeaderItems.length
      ? sortableHeaderItems
      : [];
  }

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
    this.sortableHeaderItems.forEach((element) => {
      element.addEventListener("pointerdown", this.onHeaderClick);
    });
  }

  removeEventListeners() {
    this.sortableHeaderItems.forEach((element) => {
      element.removeEventListener("pointerdown", this.onHeaderClick);
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.removeEventListeners();
    this.remove();
  }
}
