export default class LocalStorage {
  constructor(item, initialValues = "") {
    this.item = item;
    this.initialValues = initialValues;
  }

  save(data) {
    localStorage.setItem(this.item, JSON.stringify(data));
  }

  load() {
    const data = localStorage.getItem(this.item);

    return data ? JSON.parse(data) : this.initialValues;
  }

  delete() {
    localStorage.removeItem(this.item);
  }
}
