const express = require("express");
const { query } = require("./db");
const app = express();
const PORT = 2121;
const conn = require("./db");
const token = require("./jwt/token");
const mysql = require("mysql2");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

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

app.put(`/updateProduct`, (req, res) => {
  let arrayList = req.body;
  if (!req.body) return new Error("Please Provide Data");
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

app.get("/getSubCatProduct/:subCatId", (req, res) => {
  if (!req.params)
    return res.status(400).send({
      err: "Please Provide Sub Category ID",
    });
  let q = `select * from productlist where sub_cat_id = ${req.params.subCatId}`;
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

app.get("/getBrand", (req, res) => {
  let q = `select * from clothes_brand`;
  conn.query(q, (err, data) => {
    if (err)
      return res.status(400).send({
        error: err,
        message: "API Fail",
      });
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

// app.get("/getClotheBrand/:brandId/:subCatId", (req, res) => {
//   if (!req.params)
//     return res.status(400).send({
//       error: err,
//       message: "Please Provide Brand Id",
//     });
//   let q = `select * from productlist where brand_id = ${req.params.brandId} AND sub_cat_id = ${req.params.subCatId}`;
//   conn.query(q, (err, data) => {
//     if (err)
//       return res.status(400).send({
//         error: err,
//         message: "Fail API",
//       });
//     res.status(200).send({
//       data: data,
//       message: "Success",
//     });
//   });
// });

// app.post("/priceRange/:subCatId", (req, res) => {
//   console.log(req.body);
//   if (!req.body)
//     return res.status(400).send({
//       message: "Please Provide Price",
//     });
//   let q = `select * from productlist where  sub_cat_id = ${req.params.subCatId} AND (price BETWEEN ${req.body.fVal} AND ${req.body.lVal})`;
//   conn.query(q, (err, data) => {
//     if (err)
//       return res.status(400).send({
//         error: err,
//       });
//     res.status(200).send({
//       data: data,
//       message: "Success",
//     });
//   });
// });

app.post("/filterData/:subCatId", (req, res) => {
  const { min, max, array } = req.body;
  if (!req.body)
    return res.status(400).send({
      message: "Provide Data",
    });

  let q1 = ``;
  if (min >= 0 && max > 0) {
    q1 = `(price BETWEEN ${min} AND ${max}) `;
  }
  if (q1.length > 0) {
    q1 = q1 + ` AND brand_id in (${array})`;
  } else {
    q1 = ` brand_id in (${array})`;
  }

  let q = `select * from productlist where ${q1} AND sub_cat_id = ${req.params.subCatId} `;
  conn.query(q, (err, data) => {
    if (err)
      return res.status(400).send({
        error: err,
        message: "Internal Error",
      });

    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.listen(PORT, () => console.log("App Running on ", PORT));
