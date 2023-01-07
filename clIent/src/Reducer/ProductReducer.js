import { cardClasses } from "@mui/material";

const initialState = {
  data: [],
  cartList: [],
  categoryList: [],
  subCat: [],
  sub_Cat_Product: [],
  product: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_LIST": {
      return {
        ...state,
        data: action.payload,
      };
    }

    case "PRICE_RANGE_CLOTHES": {
      return {
        ...state,
        clothesList: action.payload,
      };
    }
    case "PRICE_RANGE_GROCERY": {
      return {
        ...state,
        groceryList: action.payload,
      };
    }

    case "PRICE_RANGE_MOBILE": {
      return {
        ...state,
        mobileList: action.payload,
      };
    }

    case "PRICE_RANGE_TOY": {
      return {
        ...state,
        toyList: action.payload,
      };
    }

    case "CART_LIST": {
      return {
        ...state,
        cartList: action.payload,
      };
    }

    case "DELETE_DATA": {
      return {
        ...state,
        cartList: action.payload,
      };
    }

    case "DEC_PRICE": {
      return {
        ...state,
        cartList: [...state, action.payload],
      };
    }

    case "UPDATE_LIST": {
      debugger;
      let productData = state.data;
      let cartArray = action.payload;
      // cartArray.map((data, i) => {
      //   let index = productData.findIndex((obj) => obj.id === data.id);
      //   console.log(index);
      // });
      return {
        ...state,
        data: action.payload,
      };
    }

    case "CATEGORY_LIST": {
      return {
        ...state,
        categoryList: action.payload,
      };
    }

    case "SUB_CAT": {
      return {
        ...state,
        subCat: action.payload,
      };
    }

    case "SUB_CAT_PRODUCT": {
      return {
        ...state,
        sub_Cat_Product: action.payload,
      };
    }

    case "SELECTED_PRODUCT": {
      return {
        ...state,
        product: action.payload,
      };
    }

    default:
      return state;
  }
};

export default ProductReducer;
