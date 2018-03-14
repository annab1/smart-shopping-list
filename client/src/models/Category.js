
class Category {
  constructor(config = {}) {
    this.id = config.id;
    this.name = config.name || "";
  }

  static parse(apiProduct) {
    let category = new Category();
    category.id = apiProduct.id;
    category.name = apiProduct.name;

    return category;
  }
}

export default Category;