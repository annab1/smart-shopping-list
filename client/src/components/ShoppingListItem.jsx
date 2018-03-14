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
        <label className="container">
          {product.name}
          <input type="checkbox"
                 checked={ false }
                 onChange={ this.onCheck } />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  }

  onCheck() {

  }
}

export default ShoppingListItem;