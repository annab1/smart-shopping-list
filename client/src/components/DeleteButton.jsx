import React, {Component} from "react";

class DeleteButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="icon-btn" onClick={this.props.onDelete}>
        <span className="fa fa-trash" />
      </button>
    )
  }

}

export default DeleteButton;