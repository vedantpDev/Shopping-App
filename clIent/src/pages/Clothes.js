import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "../CSS/ProductPage.css";
import { filterClothes } from "../Actions";
import { useNavigate } from "react-router-dom";
import { cartListData } from "../Actions";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import { productCategory } from "../Actions";
import { clothesListAction } from "../Actions";

const Clothes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clothesList } = useSelector((store) => store.productDataReducer);

  const [clothes_list, setClothes_list] = useState([]);

  useEffect(() => {
    dispatch(clothesListAction());
  }, []);

  useEffect(() => {
    setClothes_list(clothesList);
  }, [clothesList]);

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
    console.log("Inside priceHanlder  ");
    let priceRange = { startPrice: strat, endPrice: end };
    dispatch(filterClothes(priceRange));
  };

  const cartHandler = (id) => {
    disabledArray.push(id);
    setDisabledArray(disabledArray);
    setBadge(badge + 1);
    const filterData = clothes_list.filter((obj) => obj.id === id);
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
        {Array.from(clothes_list).map((data, i) => {
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

export default Clothes;
