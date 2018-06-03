import React, {Component} from "react";

class DeleteButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="icon-btn"
        disabled={this.props.disabled}
        onClick={this.props.onDelete}>
        <span className="fa fa-trash" />
      </button>
    )
  }

}

export default DeleteButton;