import React, {Component} from "react";
import Pages from "../constants/Pages";
import { inject, observer } from "mobx-react";
import ShoppingListItem from "../components/ShoppingListItem";

@inject("shoppingListViewStore")
@observer
class ShoppingListPage extends Component {
  constructor(props) {
    super(props);

    this.onProductClicked = this.onProductClicked.bind(this);
  }

  render() {
    const { shoppingListViewStore } = this.props;

    if (!shoppingListViewStore.currentShoppingList) {
      //TODO - spinner
      return null;
    }

    return (
      <div className="content-panel">
        <h1 className="title">Shopping List</h1>

        <ul className="">
          { shoppingListViewStore.currentShoppingList.products.map(
            listProduct =>
              <li className="list-item" key={listProduct.product.name}>
                <ShoppingListItem product={listProduct.product}/>
              </li>
          ) }
        </ul>

        <section className="add-product-section">
          <input type="text" placeholder="Search for product"/>
          <button className="btn action-btn"
                  onClick={this.addPro}>Add</button>
        </section>
      </div>
    );
  }

  addPro() {
    const { shoppingListViewStore } = this.props;
    shoppingListViewStore.addProduct();
  }

  onProductClicked() {

  }
}

export default ShoppingListPage;