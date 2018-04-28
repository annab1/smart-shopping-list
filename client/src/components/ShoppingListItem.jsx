import React, {Component} from "react";
import DeleteButton from "./DeleteButton";

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
  }

  render() {
    const {product} = this.props;

    return (
      <div className="shopping-list-item">
        <span className="checkbox">
          <input type="checkbox"
                 id={product.name + "checkbox"}
                 value="None"
                 onChange={ this.onCheck } />
          <label htmlFor={product.name + "checkbox"} />
        </span>
        <span className="product">{product.name}</span>
        <span className="quantity">
          <input type="number" name="quantity" min="1" max="100" value={product.quantity} />
        </span>
        <span className="actions"><DeleteButton/></span>
      </div>
    );
  }

  onCheck() {

  }
}

export default ShoppingListItem;