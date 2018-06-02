import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import Pages from "../constants/Pages";
import ShoppingListTile from "../components/ShoppingListTile";
import Spinner from "../components/Spinner";

@inject("shoppingListViewStore", "userViewStore")
@observer
class ListsPage extends Component {
  constructor(props) {
    super(props);

    this.generateList = this.generateList.bind(this);
    this.loadList = this.loadList.bind(this);

    this.state = { isLoading: false };
  }

  componentDidMount() {
    if (!this.props.shoppingListViewStore.lists) {
      this.props.shoppingListViewStore.getLists();
    }
  }

  render() {
    const { shoppingListViewStore, userViewStore } = this.props;

    if (!shoppingListViewStore.lists || this.state.isLoading) {
      return <Spinner/>;
    }

    return (
      <div className="content-panel">
        <section className="padded-section flex-col">
          {userViewStore.currentUser &&
          <h1 className="content-header">
            <div>Hello {userViewStore.currentUser.firstName}, here are your lists:</div>
          </h1>
          }
          <div className="shopping-lists">
            {shoppingListViewStore.lists.length === 0 &&
            <h1 className="title">You don't have any lists yet.<br/> Start by clicking the "Generate new list" button below.</h1>
            }
            {shoppingListViewStore.lists.map(list =>
              <ShoppingListTile key={list.id}
                                list={list}
                                onClick={this.loadList}
              />
            )}
          </div>
          <button className="btn action-btn generate-list-btn"
                  onClick={this.generateList}>Generate New List</button>
        </section>
      </div>
    );

  }

  generateList() {
    const { shoppingListViewStore } = this.props;
    this.setState({ isLoading: true });

    shoppingListViewStore.generateList().then(() => {
      this.setState({ isLoading: false });
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