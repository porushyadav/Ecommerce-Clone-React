import {
  FETCH_DATA,
  INCREASE_QTY,
  DECREASE_QTY,
  DELETE_PRODUCT,
  LOADING,
  ADD_PRODUCTS,
  SORT_DATA,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/actionTypes";
const intializeState = {
  products: [],
  editproduct: {},
  inProgress: false,
  isSorted: false,
};

export default function (state = intializeState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        products: action.products,
        inProgress: false,
        isSorted: false,
      };
    case INCREASE_QTY: {
      return {
        ...state,
        inProgress: false,
      };
    }
    case DECREASE_QTY: {
      return {
        ...state,
        inProgress: false,
      };
    }
    case DELETE_PRODUCT: {
      const filter = state.products.filter((product) => {
        return product.key !== action.product.key;
      });
      return {
        ...state,
        products: filter,
        inProgress: false,
      };
    }
    case LOADING:
      return {
        ...state,
        inProgress: true,
      };
    case ADD_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.product],
      };
    case SORT_DATA:
      let sortproducts = state.products;
      sortproducts.sort(compare);

      return {
        ...state,
        products: sortproducts,
        isSorted: true,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        editproduct: action.product,
      };
    case UPDATE_PRODUCT:
      const filter = state.products.filter((product) => {
        return product.key !== action.product.key;
      });
      return {
        ...state,
        products: filter,
        editproduct: {},
      };
    default:
      return state;
  }
}

function compare(p1, p2) {
  return p1.price - p2.price;
}
