import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import Pages from "../constants/Pages";

@inject("userViewStore", "shoppingListViewStore")
@observer
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="User name" value={this.userName}/>
          <input type="password" placeholder="Password" value={this.password}/>
          <button type="button" onClick={this.onSubmit}>Submit</button>
        </form>
        <label> Don't have an account yet? <button onClick={this.signup}>Sign up</button></label>
      </div>
    );
  }

  @action.bound
  onSubmit() {
    const { userViewStore, shoppingListViewStore } = this.props;
    userViewStore.login(this.userName, this.password).then(() => {
      shoppingListViewStore.setCurrentPage(Pages.ShoppingList);
    })
  }

  signup() {
    this.props.shoppingListViewStore.setCurrentPage(Pages.Register);
  }
}

export default LoginPage;