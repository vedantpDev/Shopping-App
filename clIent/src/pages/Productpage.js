import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "../CSS/ProductPage.css";
import { productCategory } from "../Actions";
import { fetchSubCat } from "../Actions";
import { subCatProduct } from "../Actions";

const Productpage = () => {
  const dispatch = useDispatch();

  const [category_List, setCategory_List] = useState([]);
  const [subCatState, setSubCatState] = useState([]);
  const { subCat, categoryList, sub_Cat_Product } = useSelector(
    (store) => store.productDataReducer
  );

  useEffect(() => {
    dispatch(productCategory());
  }, []);

  useEffect(() => {
    setCategory_List(categoryList);
  }, [categoryList]);

  useEffect(() => {
    setSubCatState(subCat);
  }, [subCat]);

  const catClickHandler = (id) => {
    dispatch(fetchSubCat(id));
  };

  const subCatClickHandler = (subCatID) => {
    dispatch(subCatProduct(subCatID));
  };

  const allProductList = () => {
    sub_Cat_Product.length = 0;
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <div style={{ paddingTop: "8px" }}>
                <Link
                  style={{ textDecoration: "none", color: "rgb(0 0 0)" }}
                  onClick={allProductList}
                >
                  All
                </Link>
              </div>
              {Array.from(category_List).map((data, i) => {
                return (
                  <div key={i}>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        href="#"
                        onClick={() => catClickHandler(data.id)}
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {data.category}
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          {subCatState.map((subCatData, j) => {
                            return (
                              <div key={j}>
                                <Link
                                  className="dropdown-item"
                                  to="/productlist"
                                  onClick={() =>
                                    subCatClickHandler(subCatData.id)
                                  }
                                >
                                  {subCatData.name}
                                </Link>
                              </div>
                            );
                          })}
                        </li>
                      </ul>
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
