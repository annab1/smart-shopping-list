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
    this.state = {};
  }

  render() {
    return (
      <div className="content-panel small login-page">
        <h1 className="title">Login to your account</h1>
        <section className="padded-section">
          <img className="logo" src={require("../images/logo.png")} />
          <form className="login-form">
            <input type="text" placeholder="User name" value={this.userName}/>
            <input type="password" placeholder="Password" value={this.password}/>
            <button type="button" className="btn action-btn" onClick={this.onSubmit}>Submit</button>
          </form>
          {this.state.errMessage &&
            <label className="err-label">
              {this.state.errMessage}
             </label>
          }
          <label> Don't have an account yet?
            <button className="btn link-btn"
                    onClick={this.signup}>
              Sign up
            </button>
          </label>
        </section>
      </div>
    );
  }

  @action.bound
  onSubmit() {
    const { userViewStore, shoppingListViewStore } = this.props;
    userViewStore.login(this.userName, this.password).then(() => {
      shoppingListViewStore.setCurrentPage(Pages.ListsPage);
    }).catch(err => {
      this.setState({ errMessage: err });
    });
  }

  signup() {
    this.props.shoppingListViewStore.setCurrentPage(Pages.Register);
  }
}

export default LoginPage;