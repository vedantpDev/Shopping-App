import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/ProductDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";

import Header from "../components/Header";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const [selectedProduct, SetselectedProduct] = useState({});
  const [cartObj, setCartObj] = useState([]);
  const [disabledArray, setDisabledArray] = useState([]);
  const [badge, setBadge] = useState(0);
  const [allProduct, setAllProduct] = useState([]);

  const { data } = useSelector((store) => store.productDataReducer);

  useEffect(() => {
    SetselectedProduct(state);
  }, [state]);

  useEffect(() => {
    setAllProduct(data);
  }, [data]);

  const cartHandler = (id) => {
    disabledArray.push(id);
    setDisabledArray(disabledArray);
    setBadge(badge + 1);
    const filterData = allProduct.filter((obj) => obj.id === id);
    console.log(filterData);
    cartObj.push({ ...filterData[0], quantity: 1 });
  };
  // console.log("inside the Product DetailPage", cartObj);

  return (
    <div>
      <div className="container" style={{ marginTop: "32px" }}>
        <div className="row">
          <div className="col-md-6" style={{ textAlign: "center" }}>
            <img className="img-div" src={selectedProduct?.pic} />
          </div>
          <div className="col-md-6">
            <div className="description-product">
              <strong>Name</strong> : {selectedProduct?.name || ""}
            </div>
            <div className="description-product">
              <strong>Price</strong> : ₹ {selectedProduct?.price * 80 || 0}
            </div>
            <div className="description-product">
              <strong>Instock</strong> : {selectedProduct?.instock || 0}
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
                disabled={data.instock === 0}
                style={{ padding: "20px", marginRight: "10px" }}
                className="btn btn-primary"
                onClick={() => cartHandler(data.id)}
              >
                Add to Cart
              </Link>
            </div>
            <IconButton
              disabled={disabledArray.includes(data.id) ? false : true}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {/* <Header cartObj={cartObj} badge={badge} /> */}
    </div>
  );
};

export default ProductDetailPage;
