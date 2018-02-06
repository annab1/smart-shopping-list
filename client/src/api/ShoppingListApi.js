const http = require("axios");

const BASE_URL = "";

class ShoppingListApi {
  constructor() {
    this._instance = axios();
  }

  login(userName, password) {
    //TODO
    return Promise.resolve();
  }

  register(user) {
    //TODO
    return Promise.resolve();
  }

  addProduct(listId, productId, quantity) {
    return this._post("list/add_product", {
      list_id: listId,
      product_id: productId,
      quantity
    });
  }

  removeProduct(listId, productId, quantity) {
    return this._post("list/remove_product", {
      list_id: listId,
      product_id: productId,
      quantity
    });
  }

  createList(listName) {
    return this._post("list/create", {
      list_name: listName
    });
  }

  updateListName(listId, listName) {
    return this._post("list/update", {
      list_id: listId,
      list_name: listName
    });
  }

  getListProducts(listId) {
    return this._get("list/get", {
      list_id: listId
    });
  }

  getProductById(productId) {
    return this._get("get/product", {
      id: productId
    });
  }

  getProducts(prefix) {
    return this._get("get/product", {
      prefix
    });
  }

  _get(url, config) {
    return this._instance({
      method: "get",
      url: BASE_URL + url,
      ...config
    });
  }

  _post(url, config) {
    return this._instance({
      method: "post",
      url: BASE_URL+ url,
      ...config
    });
  }

}

export default new ShoppingListApi();