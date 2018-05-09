import Product from "./Product";
import { observable } from "mobx";

class ListProduct {
  @observable amount;

  constructor(config = {}) {
    this.product = config.product;
    this.list = config.list;
    this.amount = config.amount;
    this.isChecked = config.isChecked;
  }

  static parse(apiListProduct, list) {
    let listProduct = new ListProduct();
    listProduct.product = Product.parse(apiListProduct.product);
    listProduct.list = list;
    listProduct.amount = apiListProduct.amount;
    listProduct.isChecked = apiListProduct.is_checked;

    return listProduct;
  }
}

export default ListProduct;