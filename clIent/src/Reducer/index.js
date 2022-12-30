import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import userDataReducer from "./userDataReducer";

const rootReducer = combineReducers({
  productDataReducer: ProductReducer,
  userData: userDataReducer,
});

export default rootReducer;
