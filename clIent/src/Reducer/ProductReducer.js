const initialState = {
  data: [],
  cartList: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_LIST": {
      return {
        ...state,
        data: action.payload,
      };
    }

    case "PRICE_RANGE": {
      return {
        ...state,
        data: action.payload,
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

    default:
      return state;
  }
};

export default ProductReducer;
