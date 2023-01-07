import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "../CSS/ProductPage.css";
import { productCategory } from "../Actions";
import { fetchSubCat } from "../Actions";
import { useNavigate, useLocation } from "react-router-dom";
import { subCatProduct } from "../Actions";
import CategoryHomePage from "./CategoryHomePage";

const Productpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category_List, setCategory_List] = useState([]);
  const { categoryList } = useSelector((store) => store.productDataReducer);

  useEffect(() => {
    dispatch(productCategory());
  }, []);

  useEffect(() => {
    setCategory_List(categoryList);
  }, [categoryList]);

  const [subCatState, setSubCatState] = useState([]);

  const catClickHandler = (id) => {
    dispatch(fetchSubCat(id));
    navigate("/productlist");
  };
  const { subCat } = useSelector((store) => store.productDataReducer);

  useEffect(() => {
    setSubCatState(subCat);
  }, [subCat]);

  const subCatClickHandler = (subCatID) => {
    dispatch(subCatProduct(subCatID));
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {Array.from(categoryList).map((data, i) => {
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
                                  href="#"
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
