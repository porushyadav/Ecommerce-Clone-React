import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Home, CheckOut, editProduct, AddProduct } from "./index";
import { connect } from "react-redux";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ToastContainer autoClose={1500} />
          <Navbar />
          <Switch>
            <Route path="/Ecommerce-clone-React" exact component={Home} />
            <Route path="/AddProduct" component={AddProduct} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/editProduct" component={editProduct} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function MapStateToprops(state) {
  return {
    products: state.products,
  };
}

export default connect(MapStateToprops)(App);
