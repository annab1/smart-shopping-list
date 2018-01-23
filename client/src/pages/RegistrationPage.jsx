import React, {Component} from "react";
import Pages from "../constants/Pages";
import {inject} from "mobx-react";

@inject("userViewStore", "shoppingListViewStore")
class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.setGender = this.setGender.bind(this);
    this.setRelationship = this.setRelationship.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDay: "",
      isFemale: false,
      isSingle: true,
      childrenCount: 0
    };
  }

  render() {
    const { firstName, lastName, email, password, birthDay, isFemale, isSingle, childrenCount } = this.state;

    return (
      <form>
        <input type="text" value={firstName} placeholder="First name"/>
        <input type="text" value={lastName} placeholder="Last name"/>
        <input type="email" value={email} placeholder="Email" />
        <input type="password" value={password} placeholder="Password"/>
        <input type="date" value={birthDay} />
        <label>
          <input type="radio"
                 name="gender"
                 value={true}
                 checked={isFemale}
                 onChange={this.setGender}>
          </input>
          Female
        </label>
        <label>
          <input type="radio"
                 name="gender"
                 value={false}
                 checked={!isFemale}
                 onChange={this.setGender}>
          </input>
          Male
        </label>
        <label>
          <input type="radio"
                 name="relationship"
                 value={true}
                 checked={isSingle}
                 onChange={this.setRelationship}>
          </input>
          Single
        </label>
        <label>
          <input type="radio"
                 name="relationship"
                 value={false}
                 checked={!isSingle}
                 onChange={this.setRelationship}>
          </input>
          Not single
        </label>
        <input type="number" min="0" max="20" value={childrenCount}/>
        <button type="button" onClick={this.register}>Register</button>
      </form>
    );
  }

  setGender(e) {
    this.setState({ isFemale: e.target.value === "true" });
  }

  setRelationship(e) {
    this.setState({ isSingle: e.target.value === "true" });
  }

  register() {
    const { firstName, lastName, email, password, birthDay, isFemale, isSingle, childrenCount } = this.state;
    const { shoppingListViewStore, userViewStore } = this.props;
    userViewStore.register(firstName, lastName, email, password, birthDay, isFemale, isSingle, childrenCount)
      .then(() => {
        shoppingListViewStore.setCurrentPage(Pages.ShoppingList);
      });
  }
}

export default RegistrationPage;