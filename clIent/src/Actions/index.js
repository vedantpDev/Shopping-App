import axios from "axios";
import Store from "../Store";

export const productList = () => (dispatch) => {
  axios
    .get("/productlist")
    .then((res) => {
      dispatch({
        type: "PRODUCT_LIST",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loginUser = (data) => (dispatch) => {
  axios
    .post("/token", data)
    .then((res) => {
      localStorage.setItem("auth-token", res.data.token);
      dispatch({
        type: "TOKEN",
        payload: {
          name: res.data.name,
          email: res.data.email,
          contact: res.data.contact,
          gender: res.data.gender,
          token: res.data.token,
        },
      });
    })
    .catch((err) => console.log(err));
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem("auth-token");
  dispatch({
    type: "LOGOUT",
  });
};

export const filterProduct = (priceRange) => (dispatch) => {
  axios
    .post("/firstRange", priceRange)
    .then((res) => {
      dispatch({
        type: "PRICE_RANGE",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};

export const cartListData = (data) => (dispatch) => {
  dispatch({
    type: "CART_LIST",
    payload: data,
  });
};

export const deleteProduct = (id) => (dispatch) => {
  let storeData = Store.getState().productDataReducer.cartList;
  let removeData = storeData.filter((obj) => obj.id !== id);
  dispatch({
    type: "DELETE_DATA",
    payload: removeData,
  });
};

// export const updatePrice = (id, quantity) => (dispatch) => {
//   let storeData = Store.getState().productDataReducer.cartList;
//   const filterData = storeData.filter((obj) => obj.id === id);
//   let price = filterData[0].price;
//   price = filterData[0].price * 80 * quantity;
//   console.log({ ...filterData, price: price });
//   dispatch({
//     type: "DEC_PRICE",
//     payload: { ...filterData, price: price },
//   });
//   // console.log(price);
// };
