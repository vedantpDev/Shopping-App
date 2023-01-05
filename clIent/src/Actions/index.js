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

export const filterClothes = (priceRange) => (dispatch) => {
  debugger;
  axios
    .post("/clothesRange", priceRange)
    .then((res) => {
      dispatch({
        type: "PRICE_RANGE_CLOTHES",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};
export const filterGrocery = (priceRange) => (dispatch) => {
  debugger;
  axios
    .post("/groceryRange", priceRange)
    .then((res) => {
      dispatch({
        type: "PRICE_RANGE_GROCERY",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};
export const filterMobile = (priceRange) => (dispatch) => {
  axios
    .post("/mobileRange", priceRange)
    .then((res) => {
      dispatch({
        type: "PRICE_RANGE_MOBILE",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};
export const filterToy = (priceRange) => (dispatch) => {
  axios
    .post("/toyRange", priceRange)
    .then((res) => {
      dispatch({
        type: "PRICE_RANGE_TOY",
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

export const updateProduct = (productList) => (dispatch) => {
  axios
    .put(`/updateProduct`, productList)
    .then((res) => {
      console.log(res);
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

export const clothesListAction = () => (dispatch) => {
  axios
    .get("/clothes")
    .then((res) => {
      dispatch({
        type: "CLOTHES_LIST",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log("Error ", err));
};
export const groceryListAction = () => (dispatch) => {
  axios
    .get("/grocery")
    .then((res) => {
      dispatch({
        type: "GROCERY_LIST",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};
export const mobilesListAction = () => (dispatch) => {
  axios
    .get("/mobiles")
    .then((res) => {
      dispatch({
        type: "MOBILE_LIST",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};
export const toysListAction = () => (dispatch) => {
  axios
    .get("/toys")
    .then((res) => {
      dispatch({
        type: "TOY_LIST",
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};
