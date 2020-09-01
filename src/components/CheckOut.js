import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import {
  increaseProductQty,
  decreaseProductQty,
  deleteProduct,
  addCart,
  removeCart,
} from "../actions/products";
class CheckOut extends Component {
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
    this.props.dispatch(deleteProduct(product));
  };

  addToCard = (product) => {
    this.increaseQty(product);
    this.props.dispatch(addCart(product));
  };
  removeFromCard = (product) => {
    product.count = 0;
    this.props.dispatch(decreaseProductQty(product));
    this.props.dispatch(removeCart(product));
  };
  checkStatusOfProduct = (product) => {
    const { cart } = this.props.cart;
    let value = cart.indexOf(product);
    if (value !== -1) return true;

    return false;
  };
  checkTotal = () => {
    const { cart } = this.props.cart;
    let price = 0;
    for (let i of cart) {
      price += i.count * i.price;
    }
    console.log(price);
    return price;
  };
  render() {
    const { cart } = this.props.cart;
    return (
      <div>
        <div className="outer">
          <div>
            <div style={{ fontSize: "50px" }}>CHECKOUT</div>
            <div style={{ fontSize: "50px" }}>
              Total Price {this.checkTotal()}
            </div>
          </div>

          {cart.map((product) => (
            <div className="items">
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
                  <div className="cursor">
                    <img
                      className="increase-decrease "
                      src="https://image.flaticon.com/icons/svg/481/481874.svg"
                      alt="edit"
                    />
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

export default connect(MapStateToprops)(CheckOut);
