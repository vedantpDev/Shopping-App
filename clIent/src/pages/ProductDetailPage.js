import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/ProductDetailPage.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import { cartListData } from "../Actions/index";

const ProductDetailPage = () => {
  const dispatch = useDispatch();

  const { state } = useLocation();
  const [selectedProduct, SetselectedProduct] = useState({});
  const [disabledArray, setDisabledArray] = useState([]);
  const [itemArray, setItemArray] = useState([]);

  useEffect(() => {
    if (state && Object.keys(state).length > 0) SetselectedProduct(state);
  }, [state]);

  const cartHandler = (id) => {
    itemArray.push({ ...selectedProduct, quantity: 1 });
    setItemArray(itemArray);
    disabledArray.push(id);
    setDisabledArray(disabledArray);
    dispatch(cartListData(itemArray));
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "32px" }}>
        <div className="row">
          <div className="col-md-6" style={{ textAlign: "center" }}>
            <img className="img-div" src={selectedProduct?.pic} />
          </div>
          <div className="col-md-6">
            <div className="description-product">
              <strong>Name</strong> : {selectedProduct?.name}
            </div>
            <div className="description-product">
              <strong>Price</strong> : ₹ {selectedProduct?.price * 80}
            </div>
            <div className="description-product">
              <strong>Instock</strong> : {selectedProduct?.instock}
            </div>
            <div className="description-product">
              <strong>Detail</strong> : {selectedProduct?.description}
            </div>
            <div>
              <Link
                disabled={selectedProduct?.instock === 0}
                style={{ padding: "20px", marginRight: "10px" }}
                className="btn btn-primary"
                onClick={() => cartHandler(selectedProduct.id)}
              >
                Add to Cart
              </Link>
            </div>
            <IconButton
              disabled={
                disabledArray.includes(selectedProduct?.id) ? false : true
              }
            >
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {/* <CategoryHomePage cartHandler={cartHandler} /> */}
    </div>
  );
};

export default ProductDetailPage;
