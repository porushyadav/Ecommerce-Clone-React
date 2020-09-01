import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../actions/products";
import { toast } from "react-toastify";

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      rating: "",
      imgUrl: "",
      count: 0,
      key: Date.now(),
      price: 0,
    };
  }
  handleChange(field, value) {
    this.setState({
      [field]: value,
    });
  }
  addDetails = (e) => {
    e.preventDefault();
    toast("Product added Successfully");

    this.setState(
      {
        key: Date.now(),
      },
      () => {
        const {
          name,
          description,
          price,
          rating,
          key,
          imgUrl,
          count,
        } = this.state;
        this.props.dispatch(
          addProduct({ imgUrl, name, description, price, count, rating, key })
        );
      }
    );
  };
  render() {
    return (
      <div className="AddToMiddle">
        <form>
          <div className="container">
            <h1>Add a Product</h1>
            <hr />

            <label htmlFor="Product-name">
              <b>Product name</b>
            </label>
            <input
              type="text"
              placeholder="Product name"
              id="Product-name"
              onChange={(e) => {
                this.handleChange("name", e.target.value);
              }}
              required
            />
            <label htmlFor="link-url">
              <b>Url</b>
            </label>
            <input
              type="text"
              placeholder="image-url"
              id="link-url"
              onChange={(e) => {
                this.handleChange("imgUrl", e.target.value);
              }}
              required
            />
            <label htmlFor="Price">
              <b>Price</b>
            </label>

            <input
              type="text"
              placeholder="Price of Product"
              id="Price"
              onChange={(e) => {
                this.handleChange("price", e.target.value);
              }}
              required
            />
            <label htmlFor="rating">
              <b>Rating</b>
            </label>

            <input
              type="text"
              placeholder="Rating on the scale of 5"
              id="rating"
              onChange={(e) => {
                this.handleChange("rating", e.target.value);
              }}
              required
            />
            <label className="label" htmlFor="Description">
              <b>Description</b>
            </label>
            <textarea
              type="text"
              placeholder="Description About the Product"
              id="Description"
              onChange={(e) => {
                this.handleChange("description", e.target.value);
              }}
              required
            />

            <hr />
            <div className="registerbtn">
              <button type="submit" onClick={this.addDetails}>
                <h1>Add</h1>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
function MapStateToprops(state) {
  return {
    products: state.products,
  };
}

export default connect(MapStateToprops)(AddProduct);
