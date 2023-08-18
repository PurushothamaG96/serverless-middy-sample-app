const middy = require("middy");
const { jsonBodyParser, httpErrorHandler } = require("middy/middlewares");
const mongooseConnection = require("../database-connections");
const UserModel = require("../model/usermodel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handler = async (event, context, cb) => {
  const { name, email, password } = event.body;
  mongooseConnection();
  const users = await UserModel.findOne({ email: email });
  console.log(users);
  if (users) {
    cb(null, {
      statusCode: 409,
      body: "Users already Exists",
    });
  } else {
    const hash = await bcrypt.hash(password, saltRounds);
    const createdUser = await UserModel.create({
      name,
      email,
      password: hash,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(createdUser),
    };
  }
};

exports.handler = middy(handler).use(jsonBodyParser()).use(httpErrorHandler());
