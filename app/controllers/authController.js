var express = require('express');
const {registerValidate, loginValidate, passwordValidate, newPasswordValidate, profileValidate, resetpValidate} = require('../validations/authValidation');
const { generateToken } = require("../helpers/auth");
const logger = require('../loggers/logger');
const saltRounds = 10;
const {UserModel} = require('../helpers/db');
const bcrypt = require('bcrypt');
const { response } = require('express');
const {OTPsend} = require("../services/mail");


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);


  exports.register = (req, res) => {
    res.render('register', {
      values: req.body
    });
  }
  
exports.authregister= async (req, res, next) => {
 
  try {
    let { error } = registerValidate(req.body);
    if (error) {
      if (error.details[0].context.key == 'fname') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error1: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'lname') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error2: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'email') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error3: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'password') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error4: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'cpassword') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error5: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'gender') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error6: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'phone') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error7: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'hobby') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error9: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'city') {
        var err1 = error.details[0].message;
        return res.render('register', {
          error10: err1,
          values: req.body
        });
      }
    }
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    UserModel.findOne({ email: req.body.email }, async (err, response) => {
      if (response) {
        let err1 = "User Email already exist";
        return res.render('register', {
          error: err1,
          values: req.body
        });
        
      } else {
      
        const user = new UserModel({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: encryptedPassword,
          image:req.file.filename,
          gender:req.body.gender,
          hobby:req.body.hobby,
          city:req.body.city,
          phone:req.body.phone
        });
        user.save((err) => {
          if (err) {
            let err1 = "User registration failed";
            return res.render('register', {
              error: err1,
              values: req.body
            });

          } else {
            let success = "" + req.body.fname + "  " + req.body.lname + " successfully register";
            return res.render('login', {
              error: success,
              values: req.body
            });
          }
        })
      }
    })
  }
  catch (err) {
    console.log("err", err);
    next(new Error("user registration failed"));
  }
};


exports.fpassword= (req, res) => {
  res.render('fpassword', {
    values: req.body
  });
}

exports.verifyEmail = async (req, res, next) => {
  try {
    let { error } = passwordValidate(req.body);
    if (error) {
      if (error.details[0].context.key == 'email') {
        var err1 = error.details[0].message;
        return res.render('fpassword', {
          error1: err1
        });
      }
    }
    logger.info(req.body.email)

    UserModel.findOne({ email: req.body.email }, async (err, response) => {
      if (!response) {
        var err1 = "Please enter valid Email ";
        return res.render('fpassword', {
          error: err1
        });
      } else {
        OTPsend(req.body.email, otp);
        const updateOTP = { otp: otp };
        UserModel.updateOne({ email: req.body.email }, updateOTP, async (err, response) => {
          logger.info(response)
        })
        res.redirect('/otp');
      }
    })
  }
  catch (err) {
    logger.error("err", err)
    next(new Error("reset password failed"));
  }
};


exports.otp= (req, res) => {
  res.render('otp', {
    values: req.body
  });
}

exports.verifyOtp = async (req, res, next) => {
  try {
    logger.info(req.body.otp)
    if (otp == req.body.otp) {
      res.redirect("/npassword");

    } else {
      var err1 = "Please enter correst OTP";
      return res.render('otp', {
        error: err1
      });
    }
  }
  catch (err) {
    logger.error("err", err)
    next(new Error("reset password failed"));
  }
};


exports.npassword = (req, res) => {
  res.render('npassword', {
    values: req.body
  });
}

exports.updatePassword = async (req, res, next) => {
  try {
    let { error } = newPasswordValidate(req.body);
    if (error) {

      if (error.details[0].context.key == 'password') {
        var err1 = error.details[0].message;
        return res.render('newPassword', {
          error1: err1,
          values: req.body
        });
      }
      if (error.details[0].context.key == 'confirm_password') {
        var err1 = error.details[0].message;
        return res.render('newPassword', {
          error2: err1,
          values: req.body
        });
      }
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const updatePassword1 = { password: encryptedPassword };
    AuthModel.updateOne({ otp: otp }, updatePassword1, async (err, response) => {
      logger.info(response)
      if (err) throw err;

      res.redirect('/')

    })

  }
  catch (err) {
    logger.error("err", err)
    next(new Error("user registration failed"));
  }
};



exports.login= (req, res) => {
  res.render('login', {
    values: req.body
  });
}



exports.authUser = async (req, res) => {
  try {
    const { error } = loginValidate(req.body);
    if (error) {
      exports.login= (req, res) => {
        res.render('login', {
          values: req.body
        });
      }
    } else {
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        const password = req.body.password;
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          res.redirect("/index");
        } else {
          return res.status(400).send("Password does not match");
        }
      } else {
        return res.status(404).send("User is not found");
      }
    }
  } catch (err) {
    console.log(err);
  }
}


exports.index= (req, res) => {
  res.render('index', {
    values: req.body
  });
}

exports.profile= (req, res) => {
  res.render('profile', {
    values: req.body
  });
}

exports.viewProfile = async (req, res) => {
  const email = req.user.email;
  try {
    const user = await UserModel.findOne({ email });

    console.log("user",user);
    if (user) {
      res.render("profile", {
        values: user,
      });
    }
  } catch (err) {
    logger.error(err);
  }
};



exports.editProfile = async (req, res) => {
  const email = req.user.email;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.render("editProfile", {
        values: user,
      });
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
      let { error } = profileValidate(req.body);
      console.log("error",error);
      if (error) {
        console.log("error", error);
        if (error.details[0].context.key == 'fname') {
          var err1 = error.details[0].message;
          return res.render('editProfile', {
            error1: err1,
            values: req.body
          });
        }
        if (error.details[0].context.key == 'lname') {
          var err1 = error.details[0].message;
          return res.render('editProfile', {
            error2: err1,
            values: req.body
          });
        }
        if (error.details[0].context.key == 'email') {
          var err1 = error.details[0].message;
          return res.render('editProfile', {
            error3: err1,
            values: req.body
          });
        }
        if (error.details[0].context.key == 'gender') {
          var err1 = error.details[0].message;
          return res.render('editProfile', {
            error4: err1,
            values: req.body
          });
        }
        if (error.details[0].context.key == 'phone') {
          var err1 = error.details[0].message;
          return res.render('editProfile', {
            error5: err1,
            values: req.body
          });
        }
        if (error.details[0].context.key == 'hobby') {
          var err1 = error.details[0].message;
          return res.render('editProfile', {
            error6: err1,
            values: req.body
          });
        }
        if (error.details[0].context.key == 'city') {
          var err1 = error.details[0].message;
          return res.render('editProfile', {
            error7: err1,
            values: req.body
          });
        }
      }
      else{

      
      const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        gender:req.body.gender,
        hobby:req.body.hobby,
        city:req.body.city,
        phone:req.body.phone,
      };
      if (req.file === undefined) {
        user.image = req.body.old_image
      } else {
        user.image = req.file.filename

      }
      const updateUser = await UserModel.updateOne({ email:req.user.email }, user)
      if (updateUser) {
          res.redirect('/profile')
      }
      else {
          return res.render('editProfile', {
              error: "user details updation failed",
              values: user
          });
      }
    }
  }
  catch (err) {
      logger.error("err", err)
      console.log(err);
      next(new Error("user details updation failed"));
  }
};


exports.resetPassword = (req, res) => {
  res.render('resetPassword')
}

exports.resetPass = async (req, res, next) => {
  try {
      let { error } = resetpValidate(req.body);
      if (error) {
          if (error.details[0].context.key == 'current_password') {
              var err1 = error.details[0].message;
              return res.render('resetPassword', {
                  error1: err1
              });
          }
          if (error.details[0].context.key == 'password') {
              var err1 = error.details[0].message;
              return res.render('resetPassword', {
                  error2: err1
              });
          }
          if (error.details[0].context.key == 'confirm_password') {
              var err1 = error.details[0].message;
              return res.render('resetPassword', {
                  error3: err1
              });
          }
      }
      const id = req.cookies.id;
      const user = await UserModel.find(id)
      if (user) {
          const comparision = await bcrypt.compare(req.body.current_password, user.password);
          if (comparision) {
              const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
              const updatePassword = { password: encryptedPassword };
              const updateUser = await UserModel.update(updatePassword, {
                  where: { id: id }
              })
              if (updateUser) {
                  return res.render('resetPassword', {
                      error: "Your Password has been Reset"
                  });
              } else {
                  return res.render('resetPassword', {
                      error: "Your Password has not been Reset"
                  });
              }
          } else {
              return res.render('resetPassword', {
                  error: "Current Password is incorrect",
              });
          }
      }
  }
  catch (err) {
      logger.error("err", err)
      next(new GeneralError("user registration failed"));
  }
};


exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.clearCookie("id");
    res.redirect('/');
  } catch (err) {
    logger.error("err", err)
    next(new Error("user logout failed"));
  }
};