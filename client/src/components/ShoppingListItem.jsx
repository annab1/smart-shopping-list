import React, {Component} from "react";
import DeleteButton from "./DeleteButton";
import {inject, observer} from "mobx-react";
import { action } from "mobx";
import classnames from "classnames";

@inject("shoppingListViewStore")
@observer
class ShoppingListItem extends Component {
  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.onMinusClicked = this.onMinusClicked.bind(this);
    this.onPlusClicked = this.onPlusClicked.bind(this);
  }

  render() {
    const {listProduct} = this.props;

    return (
      <div className={classnames("shopping-list-item", {"checked": listProduct.isChecked})}>
        <span className="checkbox">
          <input type="checkbox"
                 id={listProduct.product.name + "checkbox"}
                 value={listProduct.isChecked}
                 onChange={ this.onCheck } />
          <label htmlFor={listProduct.product.name + "checkbox"} />
        </span>
        <span className="product">{listProduct.product.name}</span>
        <span className="quantity">
          <button className="icon-btn" onClick={this.onMinusClicked}>
            <span className="fa fa-minus" />
          </button>
          <span className="amount-label">{listProduct.amount}</span>
          <button className="icon-btn" onClick={this.onPlusClicked}>
            <span className="fa fa-plus" />
          </button>
        </span>
        <span className="actions">
          <DeleteButton onDelete={this.removeProduct}/>
        </span>
      </div>
    );
  }

  onCheck() {
    const { shoppingListViewStore, listProduct } = this.props;
    shoppingListViewStore.toggleProductCheck(listProduct);
  }

  onMinusClicked() {
    if (this.props.listProduct.amount > 0) {
      this.setAmount(this.props.listProduct.amount - 1);
    }
  }

  onPlusClicked() {
    this.setAmount(this.props.listProduct.amount + 1);
  }

  @action
  setAmount(amount) {
    this.props.listProduct.amount = amount;
  }

  removeProduct() {
    this.props.shoppingListViewStore.removeProduct(this.props.listProduct);
  }
}

export default ShoppingListItem;