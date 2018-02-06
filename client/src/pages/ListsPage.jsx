import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import Pages from "../constants/Pages";

@inject("shoppingListViewStore")
@observer
class ListsPage extends Component {
  constructor(props) {
    super(props);

    this.generateList = this.generateList.bind(this);
  }

  render() {
    const { shoppingListViewStore } = this.props;

    return (
    <div className="content-panel">
      <button onClick={this.generateList}>Generate List</button>
    </div>
    );

  }

  generateList() {
    const { shoppingListViewStore } = this.props;
    shoppingListViewStore.generateList().then(() => {
      shoppingListViewStore.setCurrentPage(Pages.ShoppingList);
    });
  }

}

export default ListsPage;