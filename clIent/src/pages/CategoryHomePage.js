import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../Actions";
import "../CSS/ProductPage.css";
import { useNavigate } from "react-router-dom";
import { productCategory } from "../Actions";
import { homeCartListData } from "../Actions";

const CategoryHomePage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subCatList, setSubCatList] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProArray, setSelectedProArray] = useState([]);
  const [category_List, setCategory_List] = useState([]);

  const { categoryList, sub_Cat_Product, data } = useSelector(
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

  useEffect(() => {
    setAllProduct(data);
  }, [data]);

  useEffect(() => {
    dispatch(productList());
  }, []);

  const productHandler = (product) => {
    navigate("/productlist/productpage", { state: product });
  };

  const cartHandler = (item) => {
    selectedProArray.push({ ...item, quantity: 1 });
    setSelectedProArray(selectedProArray);
    console.log(selectedProArray);
    dispatch(homeCartListData(selectedProArray));
  };

  return (
    <div>
      <div className="row">
        <div className="col-2" style={{ border: "1px solid black" }}>
          Hello
        </div>
        <div className="col-10" style={{ border: "1px solid black" }}>
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
                    <div className="container">
                      <div
                        className="card"
                        disabled={data.instock === 0 ? true : false}
                      >
                        <div onClick={() => productHandler(data)}>
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
                          <div>
                            <button
                              type="button"
                              style={{ padding: "23px 30px 23px 30px" }}
                              onClick={() => cartHandler(data)}
                              className="btn btn-primary position-relative"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHomePage;
