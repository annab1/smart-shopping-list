import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import { computed } from "mobx";
import ShoppingListItem from "../components/ShoppingListItem";
import AddProduct from "../components/AddProduct";
import Pages from "../constants/Pages";
import BackButton from "../components/BackButton";
import classNames from "classnames";

@inject("shoppingListViewStore")
@observer
class ShoppingListPage extends Component {

  @computed
  get sortedProducts() {
    return this.props.shoppingListViewStore.currentShoppingList.products.sort(p => p.isChecked);
  }

  constructor(props) {
    super(props);

    this.editTitle = this.editTitle.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTitleKeyUp = this.onTitleKeyUp.bind(this);
    this.updateName = this.updateName.bind(this);
    this.state = { editTitle: false, insertedName: null };
  }

  componentDidUpdate() {
    this._input && this._input.focus();
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
          { this.sortedProducts.map(
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
        ref={ ref => this._input = ref }
        value={this.state.insertedName}
        onChange={this.onTitleChange}
        onBlur={this.updateName}
        onKeyUp={this.onTitleKeyUp}
      />
    )
  }

  editTitle() {
    this.setState({ editTitle: true , insertedName: this.props.shoppingListViewStore.currentShoppingList.name });
  }

  onTitleChange(e) {
    this.setState({ insertedName: e.target.value });
  }

  onTitleKeyUp(e) {
    if (e.keyCode === 13 ) { //Enter
      this.updateName();
    }
  }

  updateName() {
    const { shoppingListViewStore } = this.props;
    if (this.state.insertedName !== shoppingListViewStore.currentShoppingList.name) {
      shoppingListViewStore.updateName(this.state.insertedName);
    }
    this.setState({ editTitle: false , insertedName: null });
  }

}

export default ShoppingListPage;