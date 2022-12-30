import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

const UserDetail = ({ show, handleClose }) => {
  const { email, name, contact, gender } = useSelector(
    (store) => store.userData
  );
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            <h5 style={{ marginTop: "10px" }}>User Name</h5>
            <p>{name}</p>
            <Divider />
            <h5 style={{ marginTop: "10px" }}>User Email</h5>
            <p>{email}</p>
            <Divider />
            <h5 style={{ marginTop: "10px" }}>User Gender</h5>
            <p>{gender}</p>
            <Divider />
            <h5 style={{ marginTop: "10px" }}>User Contact</h5>
            <p>{contact}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDetail;
