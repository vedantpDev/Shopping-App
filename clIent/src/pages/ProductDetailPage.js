import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/ProductDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import { selectedSubProduct } from "../Actions/index";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const [selectedProduct, SetselectedProduct] = useState([]);
  const [disabledArray, setDisabledArray] = useState([]);

  useEffect(() => {
    Array.from(selectedProduct).push(state);
  }, [state]);

  useEffect(() => {
    SetselectedProduct(state);
  }, [state]);

  const cartHandler = (id) => {
    debugger;
    console.log([selectedProduct]);
    disabledArray.push(id);
    setDisabledArray(disabledArray);
    dispatch(selectedSubProduct([selectedProduct]));
    navigate("/productlist");
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
              <strong>Name</strong> : {selectedProduct.name}
            </div>
            <div className="description-product">
              <strong>Price</strong> : ₹ {selectedProduct.price * 80}
            </div>
            <div className="description-product">
              <strong>Instock</strong> : {selectedProduct.instock}
            </div>
            <div className="description-product">
              <strong>Detail</strong> : Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Quo, est ipsam nostrum ea adipisci esse
              voluptatem cumque unde fugit cum quisquam. Nihil aliquid
              praesentium odit, ipsum officiis laudantium omnis ducimus, tenetur
              a voluptatibus cupiditate neque. Voluptatum asperiores animi qui.
              Voluptatem accusantium quidem nemo perferendis officia reiciendis
              quasi sed delectus voluptatum placeat dolor iure eius laborum
              cupiditate amet, eos hic atque inventore aliquam commodi ea
              quibusdam nihil impedit expedita. Incidunt ipsam aut, voluptate
              totam sapiente in minus autem modi ab quam assumenda a
              perspiciatis molestias et. Cumque autem natus ipsam harum
              reprehenderit voluptates consequuntur perferendis, excepturi
              possimus, tempora repellendus rem ipsa.
            </div>
            <div>
              <Link
                disabled={selectedProduct.instock === 0}
                style={{ padding: "20px", marginRight: "10px" }}
                className="btn btn-primary"
                onClick={() => cartHandler(selectedProduct.id)}
              >
                Add to Cart
              </Link>
            </div>
            <IconButton
              disabled={
                disabledArray.includes(selectedProduct.id) ? false : true
              }
            >
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
