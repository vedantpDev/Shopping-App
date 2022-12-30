import React, { useState } from "react";
import "../CSS/Header.css";
import { Link } from "react-router-dom";
import { logOut } from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import UserDetail from "../pages/UserDetail";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { name } = useSelector((store) => store.userData);

  const logout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const userInfo = () => {
    handleShow();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Shopping App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ margin: "auto", fontSize: "larger" }}
            >
              <li className="nav-item">
                <Link className="nav-link " to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/productlist"}>
                  Product List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/about"}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/contact"}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div onClick={userInfo} style={{ marginRight: "21px" }}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{name.charAt(0)}</Avatar>
        </div>
        <div style={{ marginRight: "15px" }}>
          <button type="button" onClick={logout} className="btn btn-danger">
            LogOut
          </button>
        </div>
      </nav>
      <UserDetail show={show} handleClose={handleClose} />
    </div>
  );
};

export default Header;
