import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="nav">
        <Link className="nav-link disabled" to="/">
          {" "}
          Show Man
        </Link>
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-link" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-link" to="/rentals">
          Rentals
        </NavLink>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
