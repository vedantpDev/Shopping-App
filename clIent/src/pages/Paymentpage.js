import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../Actions";

const Paymentpage = (props) => {
  const dispatch = useDispatch();

  const { cartList } = useSelector((store) => store.productDataReducer);
  const navigate = useNavigate();

  const [billTable, setBillTable] = useState([]);

  useEffect(() => {
    setBillTable(cartList);
  }, [cartList]);

  let sum = 0;
  Array.from(billTable).map((data, i) => {
    sum += data.price * 80 * data.quantity;
  });

  const paymentHandler = () => {
    props.handleClose();
    dispatch(updateProduct(billTable));
    navigate("/");
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped table-hover">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(billTable).map((data, i) => {
                return (
                  <tr key={i} style={{ textAlign: "center" }}>
                    <th>{i + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.quantity}</td>
                    <td>{data.price * 80 * data.quantity}</td>
                  </tr>
                );
              })}
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", fontSize: " 130%" }}
                >
                  Total Amount
                </td>
                <td
                  colSpan={1}
                  style={{ textAlign: "center", fontSize: " 130%" }}
                >
                  {sum}
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={paymentHandler}>
            Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Paymentpage;
