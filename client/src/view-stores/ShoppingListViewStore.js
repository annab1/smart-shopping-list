import { observable, action, computed } from "mobx";
import Pages from "../constants/Pages";
import Product from "../models/Product";
import ShoppingListApi from "../api/ShoppingListApi";
import ShoppingList from "../models/ShoppingList";
import ListProduct from "../models/ListProduct";

class ShoppingListViewStore {
  @observable currentPage;
  @observable lists;
  @observable currentShoppingList = null;

  constructor() {
    this._api = ShoppingListApi;
    this.generateList = this.generateList.bind(this);
  }

  @action.bound
  setCurrentPage(page) {
    this.currentPage = page;
  }

  addProduct(product) {
    return this._api.addProduct(this.currentShoppingList.id, product.id, 1).then(action(() => {
      let listProduct = new ListProduct({ product, list: this.currentShoppingList, amount: 1 });
      this.currentShoppingList.products.push(listProduct);
    }));
  }

  addProductAmount(product, amount) {
    return this._api.addProduct(this.currentShoppingList.id, product.id, amount);
  }

  removeProduct(listProduct) {
    return this._api.removeProduct(this.currentShoppingList.id, listProduct.product.id, listProduct.amount)
      .then(action(() => {
        this.currentShoppingList.products.remove(listProduct);
      }));
  }

  toggleProductCheck(listProduct) {
    return this._api.setCheckProduct(listProduct, !listProduct.isChecked).then(action(() => {
      listProduct.isChecked = !listProduct.isChecked;
    }));
  }

  generateList() {
    return this._api.generateList().then(action(generatedList => {
      this.currentShoppingList = ShoppingList.parse(generatedList);
      this.lists.push(this.currentShoppingList);
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

  updateName(newName) {
    return this._api.updateListName(this.currentShoppingList.id, newName).then(action(() => {
      this.currentShoppingList.name = newName;
    }));
  }

  closeList(value) {
    return this._api.archiveList(this.currentShoppingList.id, value).then(action(() => {
      this.currentShoppingList.isArchived = value;
    }));
  }

}

export default new ShoppingListViewStore();