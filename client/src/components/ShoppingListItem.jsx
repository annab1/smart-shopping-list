import React, {Component} from "react";
import DeleteButton from "./DeleteButton";
import {inject, observer} from "mobx-react/index";

@inject("shoppingListViewStore")
@observer
class ShoppingListItem extends Component {
  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  render() {
    const {listProduct} = this.props;

    return (
      <div className="shopping-list-item">
        <span className="checkbox">
          <input type="checkbox"
                 id={listProduct.product.name + "checkbox"}
                 value="None"
                 onChange={ this.onCheck } />
          <label htmlFor={listProduct.product.name + "checkbox"} />
        </span>
        <span className="product">{listProduct.product.name}</span>
        <span className="quantity">
          <button className="icon-btn"><span className="fa fa-minus" /></button>
          <input type="number" name="quantity" min="1" max="100" value={listProduct.amount} />
          <button className="icon-btn"><span className="fa fa-plus" /></button>
        </span>
        <span className="actions">
          <DeleteButton onDelete={this.removeProduct}/>
        </span>
      </div>
    );
  }

  onCheck() {

  }

  removeProduct() {
    this.props.shoppingListViewStore.removeProduct(this.props.listProduct);
  }
}

export default ShoppingListItem;