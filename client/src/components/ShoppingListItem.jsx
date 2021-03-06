import React, {Component} from "react";
import DeleteButton from "./DeleteButton";
import {inject, observer} from "mobx-react";
import { action } from "mobx";
import classNames from "classnames";

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
    const {listProduct, isArchived} = this.props;

    return (
      <div className={classNames("shopping-list-item", {"checked": listProduct.isChecked})}>
        <span className="checkbox">
          <input type="checkbox"
                 disabled={isArchived}
                 id={listProduct.product.name + "checkbox"}
                 checked={listProduct.isChecked}
                 value={listProduct.isChecked}
                 onChange={ this.onCheck } />
          <label htmlFor={listProduct.product.name + "checkbox"} />
        </span>
        <span className="product">{listProduct.product.name}</span>
        <span className="quantity">
          {!isArchived &&
          <button className="icon-btn" onClick={this.onMinusClicked}>
            <span className="fa fa-minus"/>
          </button>
          }
          <span className="amount-label">{listProduct.amount}</span>
          {!isArchived &&
          <button className="icon-btn" disabled={isArchived} onClick={this.onPlusClicked}>
            <span className="fa fa-plus"/>
          </button>
          }
        </span>
        <span className="actions">
          {!isArchived &&
          <DeleteButton onDelete={this.removeProduct} disabled={isArchived}/>
          }
        </span>
      </div>
    );
  }

  onCheck() {
    const { shoppingListViewStore, listProduct } = this.props;
    shoppingListViewStore.toggleProductCheck(listProduct);
  }

  onMinusClicked() {
    if (this.props.listProduct.amount > 1) {
      this.setAmount(-1);
    }
  }

  onPlusClicked() {
    this.setAmount(1);
  }

  @action
  setAmount(amount) {
    const { shoppingListViewStore, listProduct } = this.props;
    shoppingListViewStore.addProductAmount(listProduct.product, amount)
      .then(action(() => {
        listProduct.amount += amount;
      }));
  }

  removeProduct() {
    this.props.shoppingListViewStore.removeProduct(this.props.listProduct);
  }
}

export default ShoppingListItem;