
class Product {
  constructor(config) {
    this.name = config.name || "";
  }

  serialize() {
    return {
        name: this.name
    };
  }
}

export default Product;