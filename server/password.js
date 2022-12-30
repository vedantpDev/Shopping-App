const bcrypt = require("bcrypt");
const password = "123456";
let hash = bcrypt.hashSync(password, 10);
console.log(hash);
// $2b$10$hhPZb.z5Ik8zpxRdf/h3YOEL8NME1m3uxdcl9btkmhNyZnWasaRzu
