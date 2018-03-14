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

  componentWillMount() {
    this.props.shoppingListViewStore.getLists();
  }

  render() {
    const { shoppingListViewStore } = this.props;

    return (
    <div className="content-panel">
      <button className="btn link-btn"
              onClick={this.generateList}>Generate List</button>
      {shoppingListViewStore.lists.map(list =>
        <div key={list.id}
             className="shopping-list-tile">
          {list.name}
        </div>
      )}
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