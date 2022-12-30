import React, { useEffect, useState } from "react";
import { productList } from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../CSS/ProductPage.css";
import { filterProduct } from "../Actions";
import { useNavigate } from "react-router-dom";
import Cartpage from "./Cartpage";
import { cartListData } from "../Actions";

const Productpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((store) => store.productDataReducer);
  const [cartObj, setCartObj] = useState([]);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    dispatch(productList());
  }, []);

  useEffect(() => {
    setProductData(data);
  }, [data]);

  const priceHanlder = (strat, end) => {
    let priceRange = { startPrice: strat, endPrice: end };
    dispatch(filterProduct(priceRange));
  };

  const cartHandler = (id) => {
    const filterData = data.filter((obj) => obj.id === id);
    // So Many Mistake
    cartObj.push({ ...filterData[0] });
  };

  const purchaseHandler = (e) => {
    e.preventDefault();
    dispatch(cartListData(cartObj));
    navigate("/cartlist");
  };
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Price Range
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link class="dropdown-item" onClick={() => priceHanlder(12, 25)}>
                ₹ 1000 to ₹ 2000
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" onClick={() => priceHanlder(26, 37)}>
                ₹ 2000 to ₹ 3000
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" onClick={() => priceHanlder(38, 50)}>
                ₹ 3000 to ₹ 4000
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={purchaseHandler}
          className="btn btn-primary"
        >
          Confirm order
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {Array.from(productData).map((data, i) => {
          return (
            <div key={i}>
              <div className="container">
                <div className="card">
                  <div>
                    <img
                      src={`${data.pic}`}
                      style={{
                        height: "300px",
                        width: "300px",
                        marginTop: "22px",
                      }}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{`${data.name}`}</h5>
                    <div
                      style={{
                        margin: "14px",
                        color: "green",
                        fontSize: "31px",
                      }}
                    >{`Price : ₹${data.price * 80}`}</div>
                    <div
                      style={{ margin: "14px", fontSize: "20px" }}
                    >{`InStock : ${data.instock}`}</div>
                    <div>
                      <Link
                        style={{ padding: "20px" }}
                        className="btn btn-primary"
                        onClick={() => cartHandler(data.id)}
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Productpage;
