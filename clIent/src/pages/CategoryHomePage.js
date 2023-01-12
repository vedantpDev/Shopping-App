import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../Actions";
import "../CSS/ProductPage.css";
import { useNavigate } from "react-router-dom";
import { productCategory } from "../Actions";
import { homeCartListData } from "../Actions";
import { getBrand } from "../Actions";
import "../CSS/CategoryHome.css";
import { filterProduct } from "../Actions";

const CategoryHomePage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subCatList, setSubCatList] = useState([]);
  // const [allProduct, setAllProduct] = useState([]);
  const [selectedProArray, setSelectedProArray] = useState([]);
  const [category_List, setCategory_List] = useState([]);
  const [brands, setBrands] = useState([]);

  const {
    categoryList,
    sub_Cat_Product,
    data,
    cloth_brands,
    storeSubCatId,
    filterProductData,
    allProduct,
  } = useSelector((store) => store.productDataReducer);
  useEffect(() => {
    dispatch(productCategory());
  }, []);

  useEffect(() => {
    setCategory_List(categoryList);
  }, [categoryList]);

  useEffect(() => {
    setSubCatList(filterProductData);
  }, [filterProductData]);

  useEffect(() => {
    setSubCatList(sub_Cat_Product);
  }, [sub_Cat_Product]);

  useEffect(() => {
    setSubCatList(data);
  }, [data]);

  useEffect(() => {
    setSubCatList(allProduct);
  }, [allProduct?.length > 0]);

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

  const [brandArray, setBrandArray] = useState([]);
  const brandHandler = (e, id, index) => {
    if (e.target.checked) {
      brandArray.push(id);
    } else {
      brandArray.splice(index, 1);
    }
  };

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const changeValueHandler = (startVale, endValue) => {
    setMin(startVale);
    setMax(endValue);
  };

  const fetchFilterData = () => {
    setBrandArray(brandArray);
    dispatch(filterProduct(storeSubCatId, min, max, brandArray));
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
            <strong>Brands</strong>
          </div>
          <div style={{ margin: "auto", width: "72%" }}>
            <ul className="nav flex-column">
              {brands.map((data, i) => {
                return (
                  <div key={i}>
                    <div style={{ padding: "5px", textAlign: "center" }}>
                      <ul style={{ float: "left" }}>
                        <>
                          <input
                            type="checkbox"
                            id={`check${i + 1}`}
                            name={`option${i + 1}`}
                            onClick={(e) => brandHandler(e, data.id, i)}
                          />
                          <span style={{ marginLeft: "21px" }}>
                            {data.company}
                          </span>
                        </>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <div>
            <div
              style={{
                fontSize: "21px",
                textAlign: "center",
                marginTop: "63px",
              }}
            >
              <strong>Price</strong>
            </div>
            <div className="container" style={{ height: "241px" }}>
              <ul style={{ textAlign: "center" }}>
                <div style={{ padding: "5px", float: "left" }}>
                  <input
                    type="radio"
                    id="age1"
                    name="age"
                    onChange={() => changeValueHandler(0, 500)}
                  />
                  <label style={{ marginLeft: "21px" }} htmlFor="age1">
                    0 - 500
                  </label>
                </div>
                <div style={{ padding: "5px", float: "left" }}>
                  <input
                    type="radio"
                    id="age1"
                    name="age"
                    onChange={() => changeValueHandler(500, 1000)}
                  />
                  <label style={{ marginLeft: "21px" }} htmlFor="age1">
                    500 - 1000
                  </label>
                </div>
                <div style={{ padding: "5px", float: "left" }}>
                  <input
                    type="radio"
                    id="age1"
                    name="age"
                    onChange={() => changeValueHandler(1000, 2000)}
                  />
                  <label style={{ marginLeft: "21px" }} htmlFor="age1">
                    1000 - 2000
                  </label>
                </div>
                <div style={{ padding: "5px", float: "left" }}>
                  <input
                    type="radio"
                    id="age1"
                    name="age"
                    onChange={() => changeValueHandler(2000, 3000)}
                  />
                  <label style={{ marginLeft: "21px" }} htmlFor="age1">
                    2000 - 3000
                  </label>
                </div>
                <div style={{ padding: "5px", float: "left" }}>
                  <input
                    type="radio"
                    id="age1"
                    name="age"
                    onChange={() => changeValueHandler(3000, 4000)}
                  />
                  <label style={{ marginLeft: "21px" }} htmlFor="age1">
                    3000 - 4000
                  </label>
                </div>
                <div style={{ padding: "5px", float: "left" }}>
                  <input
                    type="radio"
                    id="age1"
                    name="age"
                    onChange={() => changeValueHandler(4000, 5000)}
                  />
                  <label style={{ marginLeft: "21px" }} htmlFor="age1">
                    4000 - 5000
                  </label>
                </div>
                <div style={{ padding: "5px", float: "left" }}>
                  <input
                    type="radio"
                    id="age1"
                    name="age"
                    onChange={() => changeValueHandler(5000, 1000000)}
                  />
                  <label style={{ marginLeft: "21px" }} htmlFor="age1">
                    5000 +
                  </label>
                </div>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              style={{ textAlign: "center", marginTop: "15px" }}
              onClick={fetchFilterData}
              className="btn btn-primary position-relative"
            >
              Apply
            </button>
          </div>
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
            {Array.from(subCatList).map((data, i) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHomePage;
