import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import ShoppingListItem from "../components/ShoppingListItem";
import AddProduct from "../components/AddProduct";
import Pages from "../constants/Pages";
import BackButton from "../components/BackButton";
import classNames from "classnames";

@inject("shoppingListViewStore")
@observer
class ShoppingListPage extends Component {

  constructor(props) {
    super(props);

    this.editTitle = this.editTitle.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.updateName = this.updateName.bind(this);
    this.state = { editTitle: false, insertedName: null };
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
        <h1 className="title">
          {this.renderTitle()}
        </h1>

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
                <ShoppingListItem listProduct={listProduct}/>
              </li>
          ) }
        </ul>
        <AddProduct />
      </div>
    );
  }

  renderTitle() {
    const { shoppingListViewStore } = this.props;

    if (!this.state.editTitle) {
      return (
        <span className="shopping-list-name" onClick={this.editTitle}>
            {shoppingListViewStore.currentShoppingList.name}
          <span className="fa fa-pencil-alt" />
        </span>
      );
    }

    return (
      <input
        type="text"
        value={this.state.insertedName}
        onChange={this.onTitleChange}
        onBlur={this.updateName}
      />
    )
  }

  editTitle() {
    this.setState({ editTitle: true , insertedName: this.props.shoppingListViewStore.currentShoppingList.name });
  }

  onTitleChange(e) {
    this.setState({ insertedName: e.value });
  }

  updateName() {
    const { shoppingListViewStore } = this.props;
    if (this.state.insertedName !== shoppingListViewStore.currentShoppingList.name) {
      shoppingListViewStore.updateName(this.state.insertedName);
      this.setState({ editTitle: false , insertedName: null })
    }
  }

}

export default ShoppingListPage;