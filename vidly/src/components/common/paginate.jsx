import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { itemsCount, pageCount, onPageChange, currentPage } = this.props;
    const numberOfPages = Math.ceil(itemsCount / pageCount);
    if (numberOfPages === 1) return null;

    return (
      <div className="text-xs-center">
        <nav aria-label="...">
          <ul className="pagination pagination-lg">
            {_.range(1, numberOfPages + 1).map((index) => {
              return (
                <li
                  className={
                    currentPage === index ? "page-item active" : "page-item"
                  }
                  key={index}
                >
                  <a
                    className="page-link"
                    onClick={() => {
                      onPageChange(index);
                    }}
                  >
                    {index}{" "}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
