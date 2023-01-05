// import { useSelector } from "react-redux";
const initialState = {
  data: [],
  cartList: [],
  categoryList: [],
  clothesList: [],
  groceryList: [],
  mobileList: [],
  toyList: [],
};

const ProductReducer = (state = initialState, action) => {
  // const { data } = useSelector((store) => store.productDataReducer);
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

    case "CLOTHES_LIST": {
      return {
        ...state,
        clothesList: action.payload,
      };
    }

    case "GROCERY_LIST": {
      return {
        ...state,
        groceryList: action.payload,
      };
    }

    case "MOBILE_LIST": {
      return {
        ...state,
        mobileList: action.payload,
      };
    }

    case "TOY_LIST": {
      return {
        ...state,
        toyList: action.payload,
      };
    }

    default:
      return state;
  }
};

export default ProductReducer;

// productData[index] = { ...cartArray[index] };
//         productData = [...productData];
//         console.log("All Data", productData);
