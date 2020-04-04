import React, { Component } from "react";

class LikeHeart extends Component {
  render() {
    let classes = "fa fa-heart-o";
    let heartStyle = {};

    if (this.props.movie.liked) {
      classes = "fa fa-heart";
      heartStyle.color = "red";
    }
    return (
      <i
        style={heartStyle}
        className={classes}
        onClick={this.props.onLikeToggle}
        aria-hidden="true"
      ></i>
    );
  }
}

export default LikeHeart;
