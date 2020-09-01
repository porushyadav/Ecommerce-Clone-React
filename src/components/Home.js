import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  increaseProductQty,
  decreaseProductQty,
  deleteProduct,
  addCart,
  removeCart,
  sortData,
  editProduct,
} from "../actions/products";
import { fetchProducts } from "../actions/products.js";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }
  increaseQty = (product) => {
    product.count = product.count + 1;
    this.props.dispatch(increaseProductQty(product));
  };

  decreaseQty = (product) => {
    if (product.count === 0) return;
    product.count = product.count - 1;
    this.props.dispatch(decreaseProductQty(product));
  };

  deleteProduct = (product) => {
    toast("Product is Deleted");
    this.props.dispatch(deleteProduct(product));
  };

  addToCard = (product) => {
    toast("Added to Cart");

    this.increaseQty(product);
    this.props.dispatch(addCart(product));
  };
  removeFromCard = (product) => {
    toast("Remove from Cart");

    product.count = 0;
    this.props.dispatch(decreaseProductQty(product));
    this.props.dispatch(removeCart(product));
  };
  checkStatusOfProduct = (product) => {
    const { cart } = this.props.cart;
    for (let i of cart) {
      if (i.key == product.key) return true;
    }

    return false;
  };
  sortData = () => {
    this.props.dispatch(sortData());
  };
  removesortData = () => {
    this.props.dispatch(fetchProducts());
  };
  editProduct = (product) => {
    toast("Update the Product");

    this.props.dispatch(editProduct(product));
  };
  render() {
    const { products, inProgress, isSorted } = this.props.products;
    return (
      <div>
        {isSorted ? (
          <div className="sort-price" onClick={this.removesortData}>
            Remove
          </div>
        ) : (
          <div
            className="sort-price"
            style={{ backgroundColor: "blue" }}
            onClick={this.sortData}
          >
            Sort By Price
          </div>
        )}

        {inProgress && <div style={{ fontSize: "40px" }}>Loading...</div>}

        <div className="outer">
          {products.map((product) => (
            <div className="items" key={product.key}>
              <div className="left">
                <div className="img">
                  <img src={product.imgUrl} alt="item-name" />
                </div>
                <div className="data">
                  <div className="price">
                    <div style={{ fontSize: "30px" }}>{product.name}</div>
                    <div style={{ fontSize: "20px" }}> Rs:{product.price}</div>
                    <br />
                    <ReactStars size={30} value={product.rating} edit={false} />
                  </div>
                  <div className="rating">
                    <div className="qty cursor">Qty: {product.count}</div>
                    <div>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.increaseQty(product);
                        }}
                      >
                        <img
                          className="increase-decrease cursor"
                          src="https://image.flaticon.com/icons/svg/864/864378.svg"
                          alt="increase"
                        />
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.decreaseQty(product);
                        }}
                      >
                        <img
                          className="increase-decrease  "
                          src="https://image.flaticon.com/icons/svg/864/864373.svg"
                          alt="decrease"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="product-description">{product.description}</div>

                <div className="option-edit-delete">
                  <div>
                    {this.checkStatusOfProduct(product) ? (
                      <button
                        id="button-color"
                        onClick={() => {
                          this.removeFromCard(product);
                        }}
                      >
                        Remove From Card
                      </button>
                    ) : (
                      <button
                        className="button"
                        onClick={() => {
                          this.addToCard(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <Link to="/editProduct" product={this.product}>
                      <img
                        className="increase-decrease "
                        src="https://image.flaticon.com/icons/svg/481/481874.svg"
                        alt="edit"
                        onClick={() => {
                          this.editProduct(product);
                        }}
                      />
                    </Link>

                    <img
                      className="increase-decrease cursor"
                      src="https://image.flaticon.com/icons/svg/1632/1632602.svg"
                      alt="delete"
                      onClick={() => {
                        this.deleteProduct(product);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function MapStateToprops(state) {
  return {
    products: state.products,
    cart: state.cart,
  };
}

export default connect(MapStateToprops)(Home);
