import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Actions";
import Paymentpage from "./Paymentpage";

const Cartpage = () => {
  const dispatch = useDispatch();

  const { cartList } = useSelector((store) => store.productDataReducer);
  let sum = 0;
  cartList.map((data, i) => {
    sum += data.price * 80;
    return sum;
  });
  const [totalPrice, settotalPrice] = useState(sum);

  const [quantity, setQuantity] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const minusHandler = (id, price) => {
    setQuantity(quantity - 1);
    // dispatch(updatePrice(id, quantity));
    settotalPrice(price);
  };

  const plusHandler = (id, price) => {
    setQuantity(quantity + 1);
    settotalPrice(price);
  };
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
          </tr>
        </thead>
        <tbody>
          {cartList.length === 0 ? (
            <tr style={{ textAlign: "center", fontSize: "26px", color: "red" }}>
              <td colSpan={5} style={{ color: "red" }}>
                Please Select Item
              </td>
            </tr>
          ) : (
            Array.from(cartList).map((data, i) => {
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
                      type="button"
                      style={{ marginRight: "13px" }}
                      onClick={() => {
                        minusHandler(data.id, data.price * 80 * quantity);
                      }}
                      className="btn btn-danger"
                    >
                      -
                    </button>
                    <span>{quantity}</span>

                    <button
                      style={{ marginLeft: "13px" }}
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        plusHandler(data.id, data.price * 80 * quantity);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <span>{data.price * 80 * quantity}</span>
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
              {totalPrice}
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: "center" }}>
        <button
          style={{ padding: "19px 100px 19px 100px" }}
          type="button"
          onClick={buyHandler}
          className="btn btn-success"
        >
          Buy Now
        </button>
      </div>
      <Paymentpage
        totalPrice={totalPrice}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Cartpage;
