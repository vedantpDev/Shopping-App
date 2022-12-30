const express = require("express");
const { query } = require("./db");
const app = express();
const PORT = 2121;
const conn = require("./db");
const token = require("./jwt/token");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/token", token);

app.get("/productlist", (req, res) => {
  let q = `select * from productlist `;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.post("/firstRange", (req, res) => {
  if (!req.body) return new Error("Please Provide Data");
  let q = `SELECT * FROM productlist WHERE price BETWEEN ${req.body.startPrice} AND ${req.body.endPrice};`;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.listen(PORT, () => console.log("App Running on ", PORT));
