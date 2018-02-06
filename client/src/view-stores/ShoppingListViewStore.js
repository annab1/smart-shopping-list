import { observable, action } from "mobx";
import Pages from "../constants/Pages";
import Product from "../models/Product";
import User from "../models/User";
import ShoppingListApi from "../api/ShoppingListApi";
import ShoppingList from "../models/ShoppingList";

class ShoppingListViewStore {
  @observable currentPage = Pages.Login;
  @observable currentShoppingList = null;

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

}

export default new ShoppingListViewStore();