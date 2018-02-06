import Product from "./Product";

class ListProduct {
  constructor(config) {
    this.product = config.product;
    this.list = config.list;
    this.amount = config.amount;
  }

  static parse(apiListProduct, list) {
    let listProduct = new ListProduct();
    listProduct.product = Product.parse(apiListProduct);
    listProduct.list = list;
    listProduct.amount = apiListProduct.amount;

    return listProduct;
  }
}

export default ListProduct;