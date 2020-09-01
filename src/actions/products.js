import {
  FETCH_DATA,
  INCREASE_QTY,
  DECREASE_QTY,
  DELETE_PRODUCT,
  ADD_CART,
  REMOVE_CART,
  LOADING,
  ADD_PRODUCTS,
  SORT_DATA,
  Update_CART,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
} from "./actionTypes";

export function loadingRequest() {
  return {
    type: LOADING,
  };
}
export function fetchProducts() {
  return (dispatch) => {
    dispatch(loadingRequest());
    if (localStorage.getItem("products") === null) {
      const url =
        "https://my-json-server.typicode.com/porushyadav/ecommerce-fake-data/products";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("products", JSON.stringify(data));
          dispatch(updatePost(data));
        });
    } else {
      dispatch(updatePost(JSON.parse(localStorage.getItem("products"))));
      if (localStorage.getItem("card") !== null) {
        dispatch(updateCart());
      }
    }
  };
}

export function updateCart() {
  let products = JSON.parse(localStorage.getItem("card"));
  return {
    type: Update_CART,
    products,
  };
}
export function updatePost(products) {
  return {
    type: FETCH_DATA,
    products,
  };
}

export function increaseProductQty(product) {
  return {
    type: INCREASE_QTY,
    product,
  };
}

export function decreaseProductQty(product) {
  return {
    type: DECREASE_QTY,
    product,
  };
}
export function deleteProduct(product) {
  return {
    type: DELETE_PRODUCT,
    product,
  };
}

export function addCart(product) {
  if (localStorage.getItem("card") === null) {
    let card = [];
    card.push(product);
    localStorage.setItem("card", JSON.stringify(card));
  } else {
    let card = [];
    card = JSON.parse(localStorage.getItem("card"));
    card.push(product);

    console.log(card);
    localStorage.setItem("card", JSON.stringify(card));
  }

  console.log("sadsad");
  return {
    type: ADD_CART,
    product,
  };
}

export function removeCart(product) {
  if (localStorage.getItem("card") !== null) {
    let card = JSON.parse(localStorage.getItem("card"));

    const newcard = card.filter((p) => {
      return p.key !== product.key;
    });
    localStorage.setItem("card", JSON.stringify(newcard));
  }

  return {
    type: REMOVE_CART,
    product,
  };
}
export function addProduct(product) {
  let products = [];
  if (localStorage.getItem("products") !== null)
    products = JSON.parse(localStorage.getItem("products"));
  const new_product = [...products, product];
  localStorage.setItem("products", JSON.stringify(new_product));

  return {
    type: ADD_PRODUCTS,
    product,
  };
}
export function sortData() {
  return {
    type: SORT_DATA,
  };
}

export function editProduct(product) {
  localStorage.setItem("editProduct", JSON.stringify(product));
  return {
    type: EDIT_PRODUCT,
    product,
  };
}

export function updateProduct(product) {
  let products = JSON.parse(localStorage.getItem("products"));
  let new_product = products.filter((p1) => {
    return p1.key !== product.key;
  });
  new_product.push(product);
  console.log(new_product);
  localStorage.setItem("products", JSON.stringify(new_product));

  return {
    type: UPDATE_PRODUCT,
    product,
  };
}
