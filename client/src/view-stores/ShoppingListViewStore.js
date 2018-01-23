import { observable, action } from "mobx";
import Pages from "../constants/Pages";

class ShoppingListViewStore {
  @observable currentPage = Pages.Login;

  @action.bound
  setCurrentPage(page) {
    this.currentPage = page;
  }

}

export default new ShoppingListViewStore();