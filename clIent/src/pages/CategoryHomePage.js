import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../Actions";
import "../CSS/ProductPage.css";
import { useNavigate } from "react-router-dom";

import { productCategory } from "../Actions";

const CategoryHomePage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((store) => store.productDataReducer);

  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    dispatch(productList());
  }, []);

  useEffect(() => {
    setAllProduct(data);
  }, [data]);

  const [subCatList, setSubCatList] = useState([]);

  const [category_List, setCategory_List] = useState([]);
  const { categoryList, sub_Cat_Product } = useSelector(
    (store) => store.productDataReducer
  );

  useEffect(() => {
    dispatch(productCategory());
  }, []);

  useEffect(() => {
    setCategory_List(categoryList);
  }, [categoryList]);

  useEffect(() => {
    setSubCatList(sub_Cat_Product);
  }, [sub_Cat_Product]);

  const productHandler = (product) => {
    navigate("/productlist/productpage", { state: product });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {Array.from(subCatList.length > 0 ? subCatList : allProduct).map(
          (data, i) => {
            return (
              <div key={i}>
                <div className="container" onClick={() => productHandler(data)}>
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
                      >{`Price : ₹ ${data.price * 80}`}</div>
                      <div
                        style={{ margin: "14px", fontSize: "15px" }}
                      >{`InStock : ${data.instock}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default CategoryHomePage;
