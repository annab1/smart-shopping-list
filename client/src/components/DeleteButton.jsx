import React, {Component} from "react";

class DeleteButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="delete-button" onClick={this.props.onDelete}/>
    )
  }

}

export default DeleteButton;