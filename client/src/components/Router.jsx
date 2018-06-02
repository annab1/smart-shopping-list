import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import Pages from "../constants/Pages";
import RegistrationPage from "../pages/RegistrationPage";
import ShoppingListPage from "../pages/ShoppingListPage";
import LoginPage from "../pages/LoginPage";
import ListsPage from "../pages/ListsPage";
import Spinner from "./Spinner";

@inject("shoppingListViewStore")
@observer
class Router extends Component {
  _pageComponents = {
    [Pages.Login]: LoginPage,
    [Pages.Register]: RegistrationPage,
    [Pages.ShoppingList]: ShoppingListPage,
    [Pages.ListsPage]: ListsPage
  };

  componentDidMount() {
    const { shoppingListViewStore, userViewStore } = this.props;

    shoppingListViewStore.getLists()
      .then(() => {
        shoppingListViewStore.setCurrentPage(Pages.ListsPage);
      })
      .catch(() => {
        shoppingListViewStore.setCurrentPage(Pages.Login);
      });
  }

  render() {
    const { shoppingListViewStore } = this.props;
    if (!shoppingListViewStore.currentPage) {
      return <Spinner />;
    }

    const Page = this._pageComponents[shoppingListViewStore.currentPage];

    return (<div className="page-layout">
      <Page/>
    </div>);
  }
}

export default Router;