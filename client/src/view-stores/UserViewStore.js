import { observable } from "mobx";
import ShoppingListApi from "../api/ShoppingListApi";

class UserViewStore {
  @observable userName;

  constructor() {
    this._api = ShoppingListApi;
  }

  login(userName, password) {
    return this._api.login(userName, password);
  }
}

export default new UserViewStore();