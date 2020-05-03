import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import MoviesList from "./components/movieList";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/common/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <ToastContainer />
        <NavBar></NavBar>
        <Switch>
          <Route path="/movies/:movieId" component={MovieForm} />
          <Route path="/movies" component={MoviesList} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/login" component={LoginForm} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
