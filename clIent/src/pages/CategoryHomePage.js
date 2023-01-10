import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../Actions";
import "../CSS/ProductPage.css";
import { Link, useNavigate } from "react-router-dom";
import { productCategory } from "../Actions";
import { homeCartListData } from "../Actions";
import { getBrand } from "../Actions";
import { filterProduct } from "../Actions";

const CategoryHomePage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subCatList, setSubCatList] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProArray, setSelectedProArray] = useState([]);
  const [category_List, setCategory_List] = useState([]);
  const [brands, setBrands] = useState([]);

  const {
    categoryList,
    sub_Cat_Product,
    data,
    cloth_brands,
    storeSubCatId,
    filteredClothes,
  } = useSelector((store) => store.productDataReducer);

  useEffect(() => {
    dispatch(productCategory());
  }, []);

  useEffect(() => {
    setCategory_List(categoryList);
  }, [categoryList]);

  useEffect(() => {
    setSubCatList(filteredClothes);
  }, [filteredClothes]);

  useEffect(() => {
    setSubCatList(sub_Cat_Product);
  }, [sub_Cat_Product]);

  useEffect(() => {
    setAllProduct(data);
  }, [data]);

  useEffect(() => {
    dispatch(productList());
  }, []);

  useEffect(() => {
    dispatch(getBrand());
  }, []);
  useEffect(() => {
    setBrands(cloth_brands);
  }, [cloth_brands]);

  const productHandler = (product) => {
    navigate("/productlist/productpage", { state: product });
  };

  const cartHandler = (item) => {
    selectedProArray.push({ ...item, quantity: 1 });
    setSelectedProArray(selectedProArray);
    dispatch(homeCartListData(selectedProArray));
  };

  const brandHandler = (id) => {
    dispatch(filterProduct(id, storeSubCatId));
  };

  return (
    <div>
      <div className="row">
        <div
          className="col-2"
          style={{ borderRight: "1px rgb(171 162 162) solid" }}
        >
          <div
            style={{ fontSize: "21px", textAlign: "center", marginTop: "63px" }}
          >
            <strong>Clothing Brands</strong>
          </div>
          <ul className="nav flex-column">
            {brands.map((data, i) => {
              return (
                <div key={i}>
                  <li className="nav-item">
                    <Link
                      onClick={() => brandHandler(data.id)}
                      style={{ color: "black", textAlign: "center" }}
                      className="nav-link "
                    >
                      {data.company}
                    </Link>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="col-10">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {subCatList.length === 0 ? (
              <div
                style={{ color: "red", marginTop: "20px", fontSize: "x-large" }}
              >
                Data Not Available
              </div>
            ) : (
              <>
                {Array.from(
                  subCatList.length > 0 ? subCatList : allProduct
                ).map((data, i) => {
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
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHomePage;
