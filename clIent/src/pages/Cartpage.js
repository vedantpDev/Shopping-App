import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Actions";
import Paymentpage from "./Paymentpage";

const Cartpage = () => {
  const dispatch = useDispatch();
  let sum = 0;

  const { cartList } = useSelector((store) => store.productDataReducer);

  const [cartListProduct, setCartListProduct] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setCartListProduct(cartList);
  }, [cartList]);

  let instockArray = [];
  Array.from(cartListProduct).map((data, i) => {
    instockArray.push(data.instock);
  });

  const minusHandler = (i) => {
    cartListProduct[i].quantity = cartListProduct[i].quantity - 1;
    setCartListProduct([...cartListProduct]);
  };

  const plusHandler = (i) => {
    cartListProduct[i].quantity = cartListProduct[i].quantity + 1;
    setCartListProduct([...cartListProduct]);
  };

  Array.from(cartListProduct).map((data, i) => {
    sum += data.price * 80 * data.quantity;
  });

  const deleteItem = (id) => {
    dispatch(deleteProduct(id));
  };

  const buyHandler = () => {
    handleShow();
  };
  return (
    <div className="container" style={{ marginTop: "15px" }}>
      <table className="table table-striped table-hover">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartListProduct.length === 0 ? (
            <tr style={{ textAlign: "center", fontSize: "26px", color: "red" }}>
              <td colSpan={5} style={{ color: "red" }}>
                Please Select Item
              </td>
            </tr>
          ) : (
            cartListProduct.map((data, i) => {
              return (
                <tr key={i} style={{ textAlign: "center" }}>
                  <th>{data.id}</th>
                  <td>{data.name}</td>
                  <td>
                    <img
                      style={{ height: "200px", width: "200px" }}
                      src={data.pic}
                    />
                  </td>
                  <td>
                    <button
                      disabled={data.quantity === 1}
                      type="button"
                      style={{ marginRight: "13px" }}
                      onClick={() => {
                        minusHandler(i);
                      }}
                      className="btn btn-danger"
                    >
                      -
                    </button>
                    <span>{data.quantity}</span>

                    <button
                      disabled={instockArray[i] === data.quantity}
                      style={{ marginLeft: "13px" }}
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        plusHandler(i);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <span>{data.price * 80 * data.quantity}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        deleteItem(data.id);
                      }}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })
          )}
          <tr>
            <td colSpan={4} style={{ textAlign: "center", fontSize: " 190%" }}>
              Total Amount
            </td>
            <td colSpan={2} style={{ textAlign: "center", fontSize: " 190%" }}>
              {sum}
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: "center" }}>
        <button
          style={{ padding: "19px 100px 19px 100px" }}
          disabled={cartListProduct.length === 0}
          type="button"
          onClick={buyHandler}
          className="btn btn-success"
        >
          Buy Now
        </button>
      </div>
      <Paymentpage totalPrice={sum} show={show} handleClose={handleClose} />
    </div>
  );
};

export default Cartpage;
