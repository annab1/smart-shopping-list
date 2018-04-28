import Category from "./Category";

class Product {
  constructor(config = {}) {
    this.id = config.id;
    this.name = config.name || "";
    this.category = config.category;
  }

  static parse(apiProduct) {
    let product = new Product();
    product.id = apiProduct.id;
    product.name = apiProduct.name;
    product.category = Category.parse(apiProduct.category);

    return product;
  }
}

export default Product;