import "./style/style.scss";

import React from 'react';
import { Provider } from "mobx-react";
import ShoppingListViewStore from "./view-stores/ShoppingListViewStore";
import UserViewStore from "./view-stores/UserViewStore";
import { render } from "react-dom";
import Router from "./components/Router";

if (module.hot) {
  module.hot.accept();
}


render (
  <Provider shoppingListViewStore={ShoppingListViewStore} userViewStore={UserViewStore}>
    <Router/>
  </Provider>,
  document.getElementById("wrapper")
);
