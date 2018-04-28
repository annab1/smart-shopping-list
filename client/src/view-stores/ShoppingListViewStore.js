import { observable, action, computed } from "mobx";
import Pages from "../constants/Pages";
import Product from "../models/Product";
import ShoppingListApi from "../api/ShoppingListApi";
import ShoppingList from "../models/ShoppingList";
import ListProduct from "../models/ListProduct";

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

  addProduct(product, amount) {
    return this._api.addProduct(product).then(action(() => {
      let listProduct = new ListProduct({ product, list: this.currentShoppingList, amount });
      this.currentShoppingList.products.push(listProduct);
    }));
  }

  removeProduct(product) {
    let lp = this.currentShoppingList.products.find(lp => lp.product.id === product.id);
    return this._api.removeProduct(this.currentShoppingList.id, product.id, lp.amount).then(action(() => {
      this.currentShoppingList.products.remove(lp);
    }))
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