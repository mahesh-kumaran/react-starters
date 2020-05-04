import React, { Component } from "react";
import _ from "lodash";

class Paginate extends Component {
  state = {
    currentIndex: 1,
  };
  render() {
    const { itemsCount, pageCount, onPageChange, currentPage } = this.props;
    const numberOfPages = Math.ceil(itemsCount / pageCount);
    if (numberOfPages === 1) return null;
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                aria-label="Previous"
                onClick={() => {
                  onPageChange(this.state.currentIndex - 1);
                  this.setState({ currentIndex: this.state.currentIndex - 1 });
                }}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {_.range(1, numberOfPages).map((index) => {
              return (
                <li
                  className={
                    currentPage === index ? "page-item active" : "page-item"
                  }
                >
                  <a
                    className="page-link"
                    onClick={() => {
                      onPageChange(index);
                      this.setState({ currentIndex: index });
                    }}
                  >
                    {index}
                  </a>
                </li>
              );
            })}
            <li className="page-item">
              <a
                className="page-link"
                aria-label="Next"
                onClick={() => {
                  onPageChange(this.state.currentIndex + 1);
                  this.setState({ currentIndex: this.state.currentIndex + 1 });
                }}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Paginate;
