import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import Pages from "../constants/Pages";
import RegistrationPage from "../pages/RegistrationPage";
import ShoppingListPage from "../pages/ShoppingListPage";
import LoginPage from "../pages/LoginPage";

@inject("shoppingListViewStore")
@observer
class Router extends Component {
  _pageComponents = {
    [Pages.Login]: LoginPage,
    [Pages.Register]: RegistrationPage,
    [Pages.ShoppingList]: ShoppingListPage
  };

  render() {
    const Page = this._pageComponents[this.props.shoppingListViewStore.currentPage];

    return (<Page/>);
  }
}

export default Router;