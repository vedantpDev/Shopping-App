import React, { useEffect, useState } from "react";
import { productList } from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../CSS/ProductPage.css";
import { filterProduct } from "../Actions";
import { useNavigate } from "react-router-dom";
import { cartListData } from "../Actions";

const Productpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((store) => store.productDataReducer);
  const { cartList } = useSelector((store) => store.productDataReducer);
  const [cartObj, setCartObj] = useState([]);
  const [badge, setBadge] = useState(0);
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
    setBadge(badge + 1);
    const filterData = data.filter((obj) => obj.id === id);
    cartObj.push({ ...filterData[0] });
  };

  const purchaseHandler = (e) => {
    e.preventDefault();
    dispatch(cartListData(cartObj));
    navigate("/cartlist");
  };
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
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
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link
                className="dropdown-item"
                onClick={() => priceHanlder(12, 25)}
              >
                ₹ 1000 to ₹ 2000
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                onClick={() => priceHanlder(26, 37)}
              >
                ₹ 2000 to ₹ 3000
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                onClick={() => priceHanlder(38, 50)}
              >
                ₹ 3000 to ₹ 4000
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button
          type="button"
          onClick={purchaseHandler}
          className="btn btn-primary position-relative"
        >
          Confirm order
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {badge}
          </span>
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
                        fontSize: "18px",
                      }}
                    >{`Price : ₹${data.price * 80}`}</div>
                    <div
                      style={{ margin: "14px", fontSize: "15px" }}
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
