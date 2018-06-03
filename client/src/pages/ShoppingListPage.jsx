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

  @computed
  get isArchived() {
    return this.props.shoppingListViewStore.currentShoppingList.isArchived;
  }

  constructor(props) {
    super(props);

    this.editTitle = this.editTitle.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTitleKeyUp = this.onTitleKeyUp.bind(this);
    this.updateName = this.updateName.bind(this);
    this.state = { editTitle: false, insertedName: null};
    this.closeList = this.closeList.bind(this);

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
      <div className={classNames("content-panel shopping-list-page", {"archived" : this.isArchived})}>
        {this.isArchived && <i className="fa fa-clipboard-check" /> }
        <BackButton page={Pages.ListsPage} />
        <div className="content-header">
          {this.renderTitle()}
        </div>
        <div className="header">
          <span className="checkbox" />
          <span className="product">Product</span>
          <span className="quantity">Amount</span>
          <span className="actions" />
        </div>
        <div className="main-content">
          <ul className="products-list">
            { this.sortedProducts.map(
              listProduct =>
                <li className="list-item" key={listProduct.product.name}>
                  <ShoppingListItem listProduct={listProduct} isArchived={this.isArchived}/>
                </li>
            ) }
          </ul>
          {!this.isArchived &&
          <AddProduct />}
        </div>
        {!this.isArchived &&
        <button className="btn action-btn archive-btn" onClick={this.closeList}>Archive</button> }
      </div>
    );
  }

  renderTitle() {
    const { shoppingListViewStore } = this.props;

    if (!this.state.editTitle) {
      return (
        <span className={classNames("shopping-list-name", { disabled: this.isArchived})}
              onClick={this.editTitle}>
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
    if (!this.isArchived) {
      this.setState({ editTitle: true, insertedName: this.props.shoppingListViewStore.currentShoppingList.name});
    }
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

  closeList() {
    this.props.shoppingListViewStore.closeList(true);
  }

}

export default ShoppingListPage;