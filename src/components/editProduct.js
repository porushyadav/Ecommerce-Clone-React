import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct } from "../actions/products";
import { toast } from "react-toastify";

class editProduct extends Component {
  constructor() {
    super();
    const product = JSON.parse(localStorage.getItem("editProduct"));

    this.state = {
      name: product.name,
      description: product.description,
      rating: product.rating,
      imgUrl: product.imgUrl,
      count: 0,
      key: product.key,
      price: product.price,
    };
  }
  handleChange(field, value) {
    this.setState({
      [field]: value,
    });
  }
  updateProduct = (e) => {
    e.preventDefault();
    toast("Product Updated Successfully");

    const { name, description, price, rating, key, imgUrl, count } = this.state;

    console.log("dsfds");
    this.props.dispatch(
      updateProduct({
        imgUrl,
        name,
        description,
        price,
        count,
        rating,
        key,
      })
    );
  };
  render() {
    const product = JSON.parse(localStorage.getItem("editProduct"));

    return (
      <div className="AddToMiddle">
        <form>
          <div className="container">
            <h1>Update the Product</h1>
            <hr />

            <label htmlFor="Product-name">
              <b>Product name</b>
            </label>
            <input
              type="text"
              placeholder="Product name"
              id="Product-name"
              defaultValue={product.name}
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
              defaultValue={product.imgUrl}
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
              defaultValue={product.price}
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
              defaultValue={product.rating}
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
              defaultValue={product.description}
              onChange={(e) => {
                this.handleChange("description", e.target.value);
              }}
              required
            />

            <hr />
            <div className="registerbtn">
              <button type="submit" onClick={this.updateProduct}>
                <h1>Update</h1>
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

export default connect(MapStateToprops)(editProduct);
