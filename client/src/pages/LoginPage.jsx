import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import Pages from "../constants/Pages";

@inject("userViewStore", "shoppingListViewStore")
@observer
class LoginPage extends Component {

  render() {
    return (
      <form>
        <input type="text" placeholder="User name" value={this.userName}/>
        <input type="password" placeholder="Password" value={this.password}/>
        <button type="button" onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }

  @action.bound
  onSubmit() {
    const { userViewStore, shoppingListViewStore } = this.props;
    userViewStore.login(this.userName, this.password).then(() => {
      shoppingListViewStore.setCurrentPage(Pages.ShoppingList);
    })
  }
}

export default LoginPage;