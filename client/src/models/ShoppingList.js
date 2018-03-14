import ListProduct from "./ListProduct";
import { observable } from "mobx";

class ShoppingList {
  @observable products;

  constructor(config = {}) {
    this.id = config.id;
    this.date = config.date;
    this.name = config.name || "";
    this.products = [];
  }

  static parse(apiList) {
    let list = new ShoppingList();
    list.id = apiList.list_id;
    list.date = apiList.date;
    list.name = apiList.name;
    list.products = apiList.products.map( p => ListProduct.parse(p, list));

    return list;
  }

  setProducts(products) {
    this.products = products;
  }
}

export default ShoppingList;