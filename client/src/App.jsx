import React, { Component } from 'react';
import './App.css';
import { Provider } from "mobx-react";
import ShoppingListViewStore from "./view-stores/ShoppingListViewStore";
import UsersViewStore from "./view-stores/UsersViewStore";
import LoginPage from "./components/LoginPage";
import { render } from "react-dom";

if (module.hot) {
  module.hot.accept();
}


render(
  <div>Hello</div>,
  document.getElementById("wrapper")
);
