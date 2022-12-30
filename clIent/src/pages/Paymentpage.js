import React from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const Paymentpage = (props) => {
  const { cartList } = useSelector((store) => store.productDataReducer);
  const navigate = useNavigate();

  const paymentHandler = () => {
    props.handleClose();
    alert("Thank For Purchasing Product ");
    navigate("/");
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartList.map((data, i) => {
            return (
              <div key={i} style={{ fontSize: "large" }}>
                <div>
                  <strong>Product ID</strong> :
                  <span style={{ color: "blue" }}>{data.id} </span>
                </div>
                <div>
                  <strong>Product Name</strong> : {data.name}
                </div>
                <div>
                  <strong>Product Stock</strong> :
                  <span style={{ color: "red" }}>{data.instock}</span>
                </div>
                <div>
                  <strong>Product Price</strong> :
                  <span style={{ color: "green" }}> {props.totalPrice}</span>
                </div>
                <Divider />
              </div>
            );
          })}
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
