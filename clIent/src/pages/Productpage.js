import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "../CSS/ProductPage.css";
import { productCategory } from "../Actions";

const Productpage = () => {
  const dispatch = useDispatch();
  const [category_List, setCategory_List] = useState([]);
  const { categoryList } = useSelector((store) => store.productDataReducer);

  useEffect(() => {
    dispatch(productCategory());
  }, []);

  useEffect(() => {
    setCategory_List(categoryList);
  }, [categoryList]);

  let category_links = [
    "/productlist/clothes",
    "/productlist/grocery",
    "/productlist/mobiles",
    "/productlist/toys",
  ];
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {category_List.map((data, i) => {
                return (
                  <div key={i}>
                    <li className="nav-item">
                      <Link
                        className="nav-link "
                        aria-current="page"
                        to={category_links[i]}
                      >
                        {data.category}
                      </Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Productpage;
