
class ShoppingList {
    constructor({ config }) {
        this.id = config.id;
        this.name = config.name || "";
    }
}

export default ShoppingList;