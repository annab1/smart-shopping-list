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

  register(firstName, lastName, email, password, birthDay, isFemale, isSingle, childrenCount) {
    let user  = new User({ firstName, lastName, email, password, birthDay, isFemale, isSingle, childrenCount });
    return this._api.register(user).then(action(() => {
       this.currentUser = user;
    }));
  }
}

export default new UserViewStore();