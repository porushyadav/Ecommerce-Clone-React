import { ADD_CART, REMOVE_CART, Update_CART } from "../actions/actionTypes";
const intializeState = {
  cart: [],
};

export default function (state = intializeState, action) {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        cart: [...state.cart, action.product],
        inProgress: false,
      };
    case REMOVE_CART:
      const filter = state.cart.filter((product) => {
        return product.key !== action.product.key;
      });
      return {
        ...state,
        cart: filter,
        inProgress: false,
      };

    case Update_CART:
      return {
        ...state,
        cart: action.products,
      };

    default:
      return state;
  }
}
