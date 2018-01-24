import React, {Component} from "react";
import Pages from "../constants/Pages";
import { inject, observer } from "mobx-react";

@inject("shoppingListViewStore")
@observer
class ShoppingListPage extends Component {
  constructor(props) {
    super(props);

    this.onProductClicked = this.onProductClicked.bind(this);
  }

  render() {

    const { shoppingListViewStore } = this.props;
    return (
      <div className="content-panel">
        Shopping List Page
        <ul>
          { shoppingListViewStore.shoppingList.map(
            product =>
              <li>
                <input
                  type='checkbox'
                  checked={ product.chosen }
                  onChange={ this.onProductClicked }
                />
              </li>
          ) }

        </ul>
        <button onClick={this.addPro}>Add Product</button>
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