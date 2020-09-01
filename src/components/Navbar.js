import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Navbar extends Component {
  render() {
    const { cart } = this.props.cart;
    return (
      <div>
        <nav className="nav">
          <div className="left-div">
            <ul>
              <Link to="/">
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/3081/3081559.svg"
                    alt="user-dp"
                    className="img-size-profile"
                  />
                  <span>
                    <h1 style={{ color: "white" }}>ECom</h1>
                  </span>
                </li>
              </Link>
            </ul>
          </div>
          <div className="search-container">
            <img
              className="search-icon"
              src="https://image.flaticon.com/icons/svg/483/483356.svg"
              alt="search-icon"
            />
            <input placeholder="Search" />

            <div className="search-results">
              <ul>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-dp"
                  />
                  <span>John Doe</span>
                </li>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-dp"
                  />
                  <span>John Doe</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ul>
              <li className="search-results-row">
                <Link to="/addProduct">
                  <img
                    src="https://www.flaticon.com/premium-icon/icons/svg/3114/3114824.svg"
                    alt="user-dp"
                    style={{ height: "40px", width: "40px" }}
                  />
                </Link>
                <Link to="/addProduct">
                  <span>
                    <h2 style={{ color: "white" }}>Add a Product</h2>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="right-nav">
            <div className="nav-links">
              <ul>
                <li className="search-results-row card-count">
                  <Link to="/checkout">
                    <img
                      src="https://image.flaticon.com/icons/svg/1170/1170678.svg"
                      alt="card"
                      className="img-size"
                    />
                    <div className="count">{cart.length}</div>
                  </Link>
                </li>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                    alt="user-dp"
                    className="img-size-profile"
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
function MapStateToprops(state) {
  return {
    cart: state.cart,
  };
}
export default connect(MapStateToprops)(Navbar);
