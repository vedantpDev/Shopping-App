import axios from "axios";
import Store from "../Store";

export const productList = () => (dispatch) => {
  axios
    .get("/productlist", {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
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

export const cartListData = (data) => (dispatch) => {
  console.log("Inside Action", data);
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

export const updateProduct = (productList) => (dispatch) => {
  axios
    .put(`/updateProduct`, productList)
    .then((res) => {
      dispatch({
        type: "UPDATE_LIST",
        payload: productList,
      });
    })
    .catch((err) => console.log(err));
};

export const productCategory = () => (dispatch) => {
  axios
    .get("/categorylist")
    .then((res) => {
      dispatch({
        type: "CATEGORY_LIST",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchSubCat = (catId) => (dispatch) => {
  axios
    .get(`/subCat/${catId}`)
    .then((res) => {
      dispatch({
        type: "SUB_CAT",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log("Error ", err));
};

export const subCatProduct = (subCatId) => (dispatch) => {
  axios
    .get(`/getSubCatProduct/${subCatId}`)
    .then((res) => {
      dispatch({
        type: "SUB_CAT_PRODUCT",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log("Error ", err));
};
