import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { genres } = this.props;

    return (
      <ul className="list-group list-group-horizontal-lg">
        {genres.map((genre) => {
          return (
            <li
              className="list-group-item list-group-item-action"
              key={genre._id}
              onClick={() => this.props.onGroupList(genre._id)}
            >
              <a>{genre.name}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ListGroup;
