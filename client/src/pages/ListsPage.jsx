import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import Pages from "../constants/Pages";
import ShoppingListTile from "../components/ShoppingListTile";

@inject("shoppingListViewStore")
@observer
class ListsPage extends Component {
  constructor(props) {
    super(props);

    this.generateList = this.generateList.bind(this);
    this.loadList = this.loadList.bind(this);
  }

  componentDidMount() {
    if (!this.props.shoppingListViewStore.lists) {
      this.props.shoppingListViewStore.getLists();
    }
  }

  render() {
    const { shoppingListViewStore } = this.props;

    return (
      <div className="content-panel">
        <section className="padded-section flex-col">
          <button className="btn action-btn generate-list-btn"
                  onClick={this.generateList}>Generate List</button>
            <div className="shopping-lists">
              {shoppingListViewStore.lists.map(list =>
                <ShoppingListTile key={list.id}
                                  list={list}
                                  onClick={this.loadList}
                />
              )}
          </div>
        </section>
      </div>
    );

  }

  generateList() {
    const { shoppingListViewStore } = this.props;
    shoppingListViewStore.generateList().then(() => {
      shoppingListViewStore.setCurrentPage(Pages.ShoppingList);
    });
  }

  @action
  loadList(list) {
    const { shoppingListViewStore } = this.props;
    shoppingListViewStore.currentShoppingList = list;
    shoppingListViewStore.setCurrentPage(Pages.ShoppingList);
  }

}

export default ListsPage;