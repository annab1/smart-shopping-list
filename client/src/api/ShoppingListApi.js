import axios from "axios";

const BASE_URL = "http://localhost:8000/";

class ShoppingListApi {
  constructor() {
    this._instance = axios.create();

    this._instance.interceptors.request.use(config => {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${window.localStorage.getItem('jwt')}`;
      return config;
    });
  }

  login(userName, password) {
    return this._post("api/auth/token/obtain/", {
      username: userName || "admin", //TODO - remove
      password: password || "Aa123456" //TODO - remove
    }).then(res => {
      window.localStorage.setItem('jwt', res.access);
    });
  }

  register(user) {
      return this._post("api/auth/token/obtain/", {
          user: user
      }).then(res => {
          window.localStorage.setItem('jwt', res.access);
  });
  }

  addProduct(listId, productId, quantity) {
    return this._post("list/add/", {
      list_id: listId,
      product_id: productId,
      quantity
    });
  }

  removeProduct(listId, productId, quantity) {
    return this._post("list/remove/", {
      list_id: listId,
      product_id: productId,
      quantity
    });
  }

  createList(listName) {
    return this._post("list/create/", {
      list_name: listName
    });
  }

  generateList() {
    return this._get("list/generate/");
  }

  getLists() {
    return this._get("list/getall");
  }

  updateListName(listId, listName) {
    return this._post("list/update", {
      list_id: listId,
      list_name: listName
    });
  }

  getListProducts(listId) {
    return this._get(`list/get?list_id=${listId}`);
  }

  getProductById(productId) {
    return this._get(`get/product?id=${productId}`);
  }

  getProducts(prefix = "") {
    return this._get(`get/products?prefix=${prefix}`);
  }

  _get(url, config) {
    return this._instance({
      method: "GET",
      url: BASE_URL + url,
      data: config
    }).then(res => res ? res.data : null);
  }

  _post(url, config) {
    return this._instance({
      method: "POST",
      url: BASE_URL+ url,
      data: config
    }).then(res => res ? res.data : null);
  }

}

export default new ShoppingListApi();