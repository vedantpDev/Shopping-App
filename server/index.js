const express = require("express");
const { query } = require("./db");
const app = express();
const PORT = 2121;
const conn = require("./db");
const token = require("./jwt/token");
const mysql = require("mysql2");

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

app.post("/clothesRange", (req, res) => {
  if (!req.body) return new Error("Please Provide Data");
  let q = `SELECT * FROM productlist WHERE price BETWEEN ${req.body.startPrice} AND ${req.body.endPrice} AND category_key = 1`;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});
app.post("/groceryRange", (req, res) => {
  if (!req.body) return new Error("Please Provide Data");
  let q = `SELECT * FROM productlist WHERE price BETWEEN ${req.body.startPrice} AND ${req.body.endPrice} AND category_key = 2`;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});
app.post("/mobileRange", (req, res) => {
  if (!req.body) return new Error("Please Provide Data");
  let q = `SELECT * FROM productlist WHERE price BETWEEN ${req.body.startPrice} AND ${req.body.endPrice} AND category_key = 3`;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});
app.post("/toyRange", (req, res) => {
  if (!req.body) return new Error("Please Provide Data");
  let q = `SELECT * FROM productlist WHERE price BETWEEN ${req.body.startPrice} AND ${req.body.endPrice} AND category_key = 4`;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.put(`/updateProduct`, (req, res) => {
  let arrayList = req.body;
  if (!req.body) return new Error("Please Provide Data");
  // let quries = "";

  // arrayList.forEach((data) => {
  //   quries += mysql.format(
  //     `update productlist set name ='${data.name}' , price=${
  //       data.price
  //     }, instock=${data.instock - data.quantity}, pic='${data.pic}' where id=${
  //       data.id
  //     } `
  //   );
  // });

  // conn.query(quries, (err, data) => {
  //   if (err) return new Error(err);
  //   return res.status(200).send({
  //     message: "Success",
  //     data: data,
  //   });
  // });
  // Promise.all(
  const myPromises = arrayList.map((data, i) => {
    return new Promise((resolve, reject) => {
      let q = `update productlist set name ='${data.name}' , price=${
        data.price
      }, instock=${data.instock - data.quantity}, pic='${data.pic}' where id=${
        data.id
      } `;
      conn.query(q, (err, data) => {
        if (err) return reject();
        return resolve(data);
      });
    });
  });
  Promise.all(myPromises).then((values) => {
    return res.status(200).send({
      message: "Success",
    });
  });
});

app.get("/categorylist", (req, res) => {
  let q = `select * from product_category `;
  conn.query(q, (err, data) => {
    if (err)
      return res.status(400).send({
        error: err,
      });

    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.get("/clothes", (req, res) => {
  let q = `select * from productlist where category_key = 1`;
  conn.query(q, (err, data) => {
    if (err)
      return res.status(400).send({
        error: err,
      });
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.get("/grocery", (req, res) => {
  let q = `select * from productlist where category_key = 2`;
  conn.query(q, (err, data) => {
    if (err)
      return res.status(400).send({
        error: err,
      });
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.get("/mobiles", (req, res) => {
  let q = `select * from productlist where category_key = 3`;
  conn.query(q, (err, data) => {
    if (err)
      return res.status(400).send({
        error: err,
      });
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.get("/toys", (req, res) => {
  let q = `select * from productlist where category_key = 4`;
  conn.query(q, (err, data) => {
    if (err)
      return res.status(400).send({
        error: err,
      });
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.get("/subCat/:catId", (req, res) => {
  if (!req.params)
    return res.status(400).send({
      err: "Please Provide ID",
    });
  let q = `select * from subcategory where category_id = ${req.params.catId}`;
  conn.query(q, (err, data) => {
    if (err)
      return res.status(400).send({
        error: err,
      });
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.listen(PORT, () => console.log("App Running on ", PORT));
