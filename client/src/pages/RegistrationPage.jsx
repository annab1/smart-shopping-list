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
    this.firstNameChanged = this.firstNameChanged.bind(this);
    this.lastNameChanged = this.lastNameChanged.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.childrenChanged = this.childrenChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.birthdayChanged = this.birthdayChanged.bind(this);

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


    firstNameChanged(event) {
        this.setState({firstName: event.target.value});
    }

    lastNameChanged(event) {
        this.setState({lastName: event.target.value});
    }

    childrenChanged(event) {
        this.setState({childrenCount: event.target.value});
    }

    emailChanged(event) {
        this.setState({email: event.target.value});
    }

    childrenChanged(event) {
        this.setState({childrenCount: event.target.value});
    }

    passwordChanged(event) {
        this.setState({password: event.target.value});
    }

    birthdayChanged(event) {
        this.setState({birthDay: event.target.value});
    }

  render() {
    const { firstName, lastName, email, password, birthDay, isFemale, isSingle, childrenCount } = this.state;

    return (
      <div className="content-panel register-page">
        <h1 className="title">Registration</h1>
        <form className="register-form padded-section">
          <input type="text" value={firstName} placeholder="First name" onChange={this.firstNameChanged} />
          <input type="text" value={lastName} placeholder="Last name" onChange={this.lastNameChanged}/>
          <input type="email" value={email} placeholder="Email" onChange={this.emailChanged}/>
          <input type="password" value={password} placeholder="Password" onChange={this.passwordChanged}/>
          <input type="date" value={birthDay} onChange={this.birthdayChanged} />
          <label className="radio-inline">
            <input type="radio"
                   name="gender"
                   value={true}
                   checked={isFemale}
                   onChange={this.setGender}>
            </input>
            Female
          </label>
          <label className="radio-inline">
            <input type="radio"
                   name="gender"
                   value={false}
                   checked={!isFemale}
                   onChange={this.setGender}>
            </input>
            Male
          </label>
          <label className="radio-inline">
            <input type="radio"
                   name="relationship"
                   value={true}
                   checked={isSingle}
                   onChange={this.setRelationship}>
            </input>
            Single
          </label>
          <label className="radio-inline">
            <input type="radio"
                   name="relationship"
                   value={false}
                   checked={!isSingle}
                   onChange={this.setRelationship}>
            </input>
            Not single
          </label>
          <input type="number" min="0" max="20" value={childrenCount} placeholder="Number of Children" onChange={this.childrenChanged}/>
          <button className="btn action-btn" onClick={this.register}>Register</button>
        </form>
      </div>
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
        shoppingListViewStore.setCurrentPage(Pages.ListsPage);
      });
  }
}

export default RegistrationPage;