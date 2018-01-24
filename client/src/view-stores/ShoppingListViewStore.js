import { observable, action } from "mobx";
import Pages from "../constants/Pages";
import Product from "../models/Product";
import User from "../models/User";
import ShoppingListApi from "../api/ShoppingListApi";

class ShoppingListViewStore {
  @observable currentPage = Pages.Login;
  @observable shoppingList = [];

  constructor() {
    this._api = ShoppingListApi;
  }

  @action.bound
  setCurrentPage(page) {
    this.currentPage = page;
  }

  addProduct(productName) {
    let newProd  = new Product({ name: productName });
    return this._api.addProduct(newProd).then(action(() => {
      this.shoppingList.push(newProd);
    }));
  }

}

export default new ShoppingListViewStore();