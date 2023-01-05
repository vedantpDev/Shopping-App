import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mobilesListAction } from "../Actions";
import { Link } from "react-router-dom";
import "../CSS/ProductPage.css";
import { filterMobile } from "../Actions";
import { useNavigate } from "react-router-dom";
import { cartListData } from "../Actions";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import { productCategory } from "../Actions";

const Mobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mobileList } = useSelector((store) => store.productDataReducer);

  const [mobile_list, setMobile_list] = useState([]);

  useEffect(() => {
    dispatch(mobilesListAction());
  }, []);

  useEffect(() => {
    setMobile_list(mobileList);
  }, [mobileList]);

  const [cartObj, setCartObj] = useState([]);
  const [badge, setBadge] = useState(0);
  const [productData, setProductData] = useState([]);
  const [disabledArray, setDisabledArray] = useState([]);
  const [category_List, setCategory_List] = useState([]);
  const { categoryList } = useSelector((store) => store.productDataReducer);

  useEffect(() => {
    dispatch(productCategory());
  }, []);

  useEffect(() => {
    setCategory_List(categoryList);
  }, [categoryList]);

  const priceHanlder = (strat, end) => {
    let priceRange = { startPrice: strat, endPrice: end };
    dispatch(filterMobile(priceRange));
  };

  const cartHandler = (id) => {
    disabledArray.push(id);
    setDisabledArray(disabledArray);
    setBadge(badge + 1);
    const filterData = mobile_list.filter((obj) => obj.id === id);
    cartObj.push({ ...filterData[0], quantity: 1 });
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
                onClick={() => priceHanlder(12, 31.25)}
              >
                ₹ 900 to ₹ 2500
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                onClick={() => priceHanlder(31.25, 44)}
              >
                ₹ 2501 to ₹ 4000
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
        {Array.from(mobile_list).map((data, i) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mobile;
