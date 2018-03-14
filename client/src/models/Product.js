import Category from "./Category";

class Product {
  constructor(config = {}) {
    this.name = config.name || "";
    this.category = config.category;
  }

  static parse(apiProduct) {
    let product = new Product();
    product.name = apiProduct.name;
    product.category = Category.parse(apiProduct.category);

    return product;
  }
}

export default Product;