import React, {Component} from "react";
import Pages from "../constants/Pages";
import { inject, observer } from "mobx-react";
import ShoppingListItem from "../components/ShoppingListItem";

@inject("shoppingListViewStore")
@observer
class ShoppingListPage extends Component {
  constructor(props) {
    super(props);

    this.onProductClicked = this.onProductClicked.bind(this);
  }

  render() {

    const { shoppingListViewStore } = this.props;
    return (
      <div className="content-panel">
        <h1 className="title">Shopping List</h1>

        <ul className="">
          { shoppingListViewStore.shoppingList.map(
            product =>
              <li>
               <ShoppingListItem product={product}/>
              </li>
          ) }
        </ul>
      </div>
    );
  }

  addPro() {
    const { shoppingListViewStore } = this.props;
    shoppingListViewStore.addProduct();
  }

  onProductClicked() {

  }
}

export default ShoppingListPage;