import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    return (
      <div>
        {this.props.counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={this.props.onDelete}
            incrementCounter={this.props.onIncrement}
            decrementCounter={this.props.onDecrement}
          ></Counter>
        ))}
        <button
          className="btn btn-primary btn-lg btn-block "
          onClick={this.props.onReset}
        >
          {" "}
          Reset{" "}
        </button>
      </div>
    );
  }
}

export default Counters;
