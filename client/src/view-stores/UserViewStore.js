import { observable, action } from "mobx";
import ShoppingListApi from "../api/ShoppingListApi";
import User from "../models/User";

class UserViewStore {
  @observable currentUser;

  constructor() {
    this._api = ShoppingListApi;

    this.getUser = this.getUser.bind(this);
  }

  login(userName, password) {
    return this._api.login(userName, password).then(this.getUser);
  }

  getUser() {
    return this._api.getUser().then(action((userData) => {
      this.currentUser = new User(
        {...userData.user,
          id: userData.id,
          birth_date: userData.birth_date,
          gender: userData.gender,
          relationship: userData.relationship
        });
    }));
  }

  register(username,firstName, lastName, email, password, birthDay, isFemale, isSingle) {
    const userData = { username, firstName, lastName, email, password, birthDay, isFemale, isSingle };
    return this._api.register(userData).then(action(() => {
      let user  = new User(userData);
      this.currentUser = user;
    }));
  }
}

export default new UserViewStore();