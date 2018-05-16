import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import ShoppingListItem from "../components/ShoppingListItem";
import AddProduct from "../components/AddProduct";
import Pages from "../constants/Pages";
import BackButton from "../components/BackButton";

@inject("shoppingListViewStore")
@observer
class ShoppingListPage extends Component {

  constructor(props) {
    super(props);

      this.closeList = this.closeList.bind(this);

  }

  render() {
    const { shoppingListViewStore } = this.props;

    if (!shoppingListViewStore.currentShoppingList) {
      //TODO - spinner
      return null;
    }

    return (
      <div className="content-panel">
        <BackButton page={Pages.ListsPage} />
        <h1 className="title">Shopping List</h1>

        <div className="header">
          <span className="checkbox" />
          <span className="product">Product</span>
          <span className="quantity">Amount</span>
          <span className="actions" />
        </div>
        <ul className="products-list">
          { shoppingListViewStore.currentShoppingList.products.map(
            listProduct =>
              <li className="list-item" key={listProduct.product.name}>
                <ShoppingListItem listProduct={listProduct} isArchived={shoppingListViewStore.currentShoppingList.isArchived}/>
              </li>
          ) }
        </ul>
        <AddProduct />
          <button type="button" className="btn action-btn add-btn" onClick={this.closeList}>Close List</button>
      </div>
    );
  }

    closeList() {
        // const { firstName, lastName, email, password, birthDay, isFemale, isSingle, childrenCount } = this.state;
        // const { shoppingListViewStore, userViewStore } = this.props;
        this.props.shoppingListViewStore.closeList(true);
    }

}

export default ShoppingListPage;