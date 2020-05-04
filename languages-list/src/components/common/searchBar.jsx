import React from "react";

const SearchBar = ({ onChange }) => {
  return (
    <form>
      <div className="form-group">
        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
