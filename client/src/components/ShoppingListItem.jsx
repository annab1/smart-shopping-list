import React, {Component} from "react";

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
  }

  render() {
    const {product} = this.props;

    return (
      <div className="shopping-list-item">
        <span className="container">
          <input type="checkbox"
                 id={product.name + "checkbox"}
                 value="None"
                 onChange={ this.onCheck } />
          <label htmlFor={product.name + "checkbox"} />
        </span>
        {product.name}
      </div>
    );
  }

  onCheck() {

  }
}

export default ShoppingListItem;