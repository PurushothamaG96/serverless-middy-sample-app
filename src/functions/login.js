const middy = require("middy");
const { jsonBodyParser, httpErrorHandler } = require("middy/middlewares");
const inputValidation = require("../middlewares/input-validation");
// const outputValidation = require('../middlewares/output-validation');
const jwt = require("jsonwebtoken");
const mongooseConnection = require("../database-connections");
const UserModel = require("../model/usermodel");
const secretKey = "my-secret-key";
const bcrypt = require("bcrypt");

const handler = async (event, context, cb) => {
  mongooseConnection();
  const { email, password } = event.body;
  const isUserExists = await UserModel.findOne({ email: email });
  if (!isUserExists) {
    cb({
      statusCode: 404,
      message: "User Not exists",
    });
  } else {
    console.log(isUserExists);
    const isMatchdbPassword = await bcrypt.compare(
      password,
      isUserExists.password
    );
    if (isMatchdbPassword) {
      const token = jwt.sign({ userId: isUserExists._id }, secretKey, {
        expiresIn: "1h",
      });
      cb(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Authentication successfull",
          token: token,
        }),
      });
    }else{
      cb({
        statusCode: 403,
        body: JSON.stringify({
          message: "Password wrong",
        }),
      });
    }
  }
};

exports.handler = middy(handler).use(inputValidation()).use(httpErrorHandler());
