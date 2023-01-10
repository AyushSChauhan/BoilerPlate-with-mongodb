const jwt = require("jsonwebtoken");
const logger = require('../loggers/logger')
const { UserModel } = require("../helpers/db");
 
const generateToken = (req,res,next) => {
    let token = jwt.sign({email: req.body.email},process.env.SECRET_KEY);
    res.cookie("jwt",token, {
        expires: new Date(Date.now() + 30000000)
      })
      console.log(token);
      next()
      // return token
  };


    const authenticate = (req, res, next) => {

      try {
          const token = req.cookies.jwt;
          if (token == undefined) {
              return res.redirect('/');
          }
          const decode = jwt.verify(token, process.env.SECRET_KEY);
          req.user = decode;
          next();
      } catch (err) {
          logger.error(err);
      }
  }

  module.exports = { generateToken, authenticate };