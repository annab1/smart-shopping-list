import React, {Component} from "react";
import {inject, observer} from "mobx-react";

@inject("shoppingListViewStore")
class BackButton extends Component {

  constructor(props) {
    super(props);

    this.onBack = this.onBack.bind(this);
  }

  render() {
    return (
      <button className="icon-btn back-button" onClick={this.onBack}>
        <span className="fa fa-arrow-left" />
      </button>
    )
  }

  onBack() {
    this.props.shoppingListViewStore.setCurrentPage(this.props.page);
  }

}

export default BackButton;