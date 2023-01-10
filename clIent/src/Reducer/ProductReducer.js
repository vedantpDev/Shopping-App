const initialState = {
  data: [],
  cartList: [],
  categoryList: [],
  subCat: [],
  sub_Cat_Product: [],
  storeSubCatId: 0,
  cloth_brands: [],
  filteredClothes: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_LIST": {
      return {
        ...state,
        data: action.payload,
      };
    }

    case "CART_LIST": {
      return {
        ...state,
        cartList: [...state.cartList, action.payload[0]],
      };
    }

    case "HOME_CART_LIST": {
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
      let productData = state.data;
      let cartArray = action.payload;
      // cartArray.map((data, i) => {
      //   let index = productData.findIndex((obj) => obj.id === data.id);
      //   console.log(index);
      // });
      return {
        ...state,
        data: action.payload,
        cartList: [],
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

    case "STORE_SUB_CAT_ID": {
      return {
        ...state,
        storeSubCatId: action.payload,
      };
    }

    case "BRAND_NAME": {
      return {
        ...state,
        cloth_brands: action.payload,
      };
    }

    case "FILTERED_CLOTHES": {
      return {
        ...state,
        filteredClothes: action.payload,
      };
    }

    default:
      return state;
  }
};

export default ProductReducer;
