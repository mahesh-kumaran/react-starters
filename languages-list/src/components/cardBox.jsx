import React from "react";

const CardBox = ({ title, listItems }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body" style={{ backgroundColor: "orange" }}>
        <h5 className="card-title">{title}</h5>
      </div>
      <ul className="list-group list-group-flush">
        {listItems.map((item) => {
          return (
            <li className="list-group-item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CardBox;
