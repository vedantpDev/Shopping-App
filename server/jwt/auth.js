const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth_token = req.header("auth-token");
  if (!auth_token)
    return res.status(400).send({
      message: "Please Provide Token ",
    });

  try {
    let user_decode = jwt.verify(auth_token, "jwtPrivateKey");
    req.user = user_decode;
  } catch (error) {
    console.log(err);
    res.status(404).send({
      message: "Token Expired",
    });
  }
};
