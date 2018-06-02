import React, {Component} from "react";

class TitledSection extends Component {
  render() {
    return (
      <div className="titled-section flex-col">
        <div className="titled-section-title">{this.props.title}</div>
        {this.props.children}
      </div>);
  }
}

export default TitledSection;