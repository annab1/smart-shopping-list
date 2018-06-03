import React, {Component} from "react";
import cn from "classnames";

const PREVIEW_PRODUCTS_COUNT = 5;

class ShoppingListTile extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { list, onClick } = this.props;
    return (
      <div
        className={cn("shopping-list-tile", {archived: list.isArchived })}
        onClick={() => onClick(list)}>
        {list.isArchived && <i className="fa fa-clipboard-check" />}
        <div><strong>{list.name} </strong>{list.isArchived ? <i className="fa fa-clipboard-check"></i> : null}</div>
        <div className="small-text">{list.date.calendar()}</div>
        <ul className="table-list">
          {list.products.peek(PREVIEW_PRODUCTS_COUNT - 1).map(listProduct =>
            <li key={listProduct.product.name}>
              <span className="table-list-item-name">{listProduct.product.name}</span>
              <span>{listProduct.amount}</span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default ShoppingListTile;