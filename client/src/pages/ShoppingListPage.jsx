import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import ShoppingListItem from "../components/ShoppingListItem";
import AddProduct from "../components/AddProduct";

@inject("shoppingListViewStore")
@observer
class ShoppingListPage extends Component {

  constructor(props) {
    super(props);

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

        <div className="header">
          <span className="checkbox" />
          <span className="product">Product</span>
          <span className="quantity">Quantity</span>
        </div>
        <ul className="">
          { shoppingListViewStore.currentShoppingList.products.map(
            listProduct =>
              <li className="list-item" key={listProduct.product.name}>
                <ShoppingListItem product={listProduct.product}/>
              </li>
          ) }
        </ul>
        <AddProduct />
      </div>
    );
  }

}

export default ShoppingListPage;