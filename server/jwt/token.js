const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const conn = require("../db");
const route = express.Router();

route.post("/", (req, res) => {
  if (!req.body) return new Error("Please Provde Data");
  let q = `select * from user where email='${req.body.email}' `;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    const { id, name, email, contact, gender } = data[0];

    let user = data.find((u) => u.email == req.body.email);
    if (!user) throw new Error("Provide Valid Email");

    let checkPass = bcrypt.compareSync(req.body.password, user.password);
    if (!checkPass) throw new Error("Provide Valid Password");

    const tkn = jwt.sign({ id: id, email: email }, "jwtPrivateKey", {
      expiresIn: "5 min",
    });

    res.status(200).send({
      name: name,
      email: email,
      gender: gender,
      contact: contact,
      token: tkn,
      message: "Success",
    });
  });
});

module.exports = route;
