import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "grey",
          margin: 20,
          width: 350,
          height: 400,
          float: "left",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <h4 style={{ color: "white", textAlign: "center", margin: 15 }}>
          Counter #{this.props.counter.id}{" "}
        </h4>
        <span style={{ fontSize: 80 }}> {this.props.counter.value} </span>

        <div style={{ position: "relative", top: 100 }}>
          <span>
            <button
              className="btn btn-warning"
              style={{ float: "left", width: 45, height: 45 }}
              onClick={() => {
                this.props.incrementCounter(this.props.counter);
              }}
            >
              +
            </button>
            <button
              className="btn btn-warning"
              style={{ float: "right", width: 45, height: 45 }}
              onClick={() => {
                this.props.decrementCounter(this.props.counter);
              }}
              disabled={this.props.counter.value === 0 ? "disabled" : ""}
            >
              -
            </button>
          </span>
          <button
            className="btn btn-danger  btn-lg btn-block "
            onClick={() => {
              this.props.onDelete(this.props.counter.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
