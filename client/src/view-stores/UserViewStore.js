import { observable, action } from "mobx";
import ShoppingListApi from "../api/ShoppingListApi";
import User from "../models/User";

class UserViewStore {
  @observable currentUser;

  constructor() {
    this._api = ShoppingListApi;
  }

  login(userName, password) {
    return this._api.login(userName, password);
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