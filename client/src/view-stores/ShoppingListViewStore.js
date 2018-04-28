import { observable, action, computed } from "mobx";
import Pages from "../constants/Pages";
import Product from "../models/Product";
import ShoppingListApi from "../api/ShoppingListApi";
import ShoppingList from "../models/ShoppingList";

class ShoppingListViewStore {
  @observable currentPage = Pages.Login;
  @observable lists = [];
  @observable currentShoppingList = null;

  @computed
  get uncheckedItems() {
    return this.currentShoppingList.products;
  }

  constructor() {
    this._api = ShoppingListApi;

    this.generateList = this.generateList.bind(this);
  }

  @action.bound
  setCurrentPage(page) {
    this.currentPage = page;
  }

  addProduct(productName) {
    let newProd  = new Product({ name: productName });
    return this._api.addProduct(newProd).then(action(() => {
      this.currentShoppingList.products.push(newProd);
    }));
  }

  generateList() {
    return this._api.generateList().then(action(generatedList => {
      this.currentShoppingList = ShoppingList.parse(generatedList);
    }));
  }

  getProducts(prefix) {
    return this._api.getProducts(prefix).then(products =>
      products.map(p => Product.parse(p)));
  }

  getLists() {
    return this._api.getLists().then(action(lists => {
      this.lists = lists.map(l => ShoppingList.parse(l));
    }));
  }

}

export default new ShoppingListViewStore();