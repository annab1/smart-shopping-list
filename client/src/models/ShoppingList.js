import ListProduct from "./ListProduct";
import { observable } from "mobx";
import moment from "moment";

class ShoppingList {
  @observable products;
  @observable name;
  @observable isArchived;

  constructor(config = {}) {
    this.id = config.id;
    this.date = config.date;
    this.name = config.name || "";
    this.products = [];
    this.isArchived = config.isArchived || false;
  }

  static parse(apiList) {
    let list = new ShoppingList();
    list.id = apiList.id;
    list.date = moment(apiList.date);
    list.name = apiList.name;
    list.products = apiList.products.map( p => ListProduct.parse(p, list));
    list.isArchived = apiList.is_archived;

    return list;
  }

  setProducts(products) {
    this.products = products;
  }
}

export default ShoppingList;