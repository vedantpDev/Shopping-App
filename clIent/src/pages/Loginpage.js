import React, { useState } from "react";
import "../CSS/Loginpage.css";
import { loginUser } from "../Actions";
import { useDispatch } from "react-redux";

const Loginpage = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  return (
    <div style={{ marginTop: "12%" }}>
      <form className="form-class">
        <div className="label-input mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={changeHandler}
            className="form-control"
          />
        </div>
        <div className="label-input mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={changeHandler}
            className="form-control"
          />
        </div>

        <button
          style={{ margin: "23px" }}
          type="submit"
          className="btn btn-primary"
          onClick={loginSubmitHandler}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Loginpage;
