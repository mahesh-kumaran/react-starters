import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import MoviesList from "./components/movieList";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/common/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from './components/loginForm';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <NavBar></NavBar>
        <Switch>
          <Route path="/movies/:movieId" component={MovieForm}></Route>
          <Route path="/movies" component={MoviesList}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
