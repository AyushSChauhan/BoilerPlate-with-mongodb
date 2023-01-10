var express = require('express');
const { CatagoryModel } = require("../helpers/db");
const { catValidate } = require("../validations/catValidation");
const logger = require('../loggers/logger');

exports.viewCatagory = async (req, res) => {
  try {
    const user = await CatagoryModel.find();
    console.log("user", user);
    if (user) {
      res.render("catagory", {
        values: user,
      });
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.catagoryAdd = (req, res) => {
  res.render('catagoryAdd');
}

exports.addData = (req, res) => {
  try {
    const { error } = catValidate(req.body);
    if (error) {
      return res.status(400).send(error.details[0]);
    } else {
      const data = {
        name: req.body.name,
      };
      const categoryData = new CatagoryModel(data);
      categoryData.save().then((data) => {
        res.redirect("/catagory");
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};

exports.editcat = async (req, res) => {
  try {
    const user = await CatagoryModel.findById({ _id: req.params.id });
    if (user) {
      res.render('catagoryEdit', {
        values: user
      });
    }
  } catch (err) {
    next(new Error('error while deleting user detail'))
  }
};

exports.deleteCat = async (req, res, next) => {
  try {
    const user = await CatagoryModel.findById({ _id: req.params.id });
    await CatagoryModel.deleteOne(user)
    await res.redirect('/catagory');
  } catch (err) {
    console.log(err);
    next(new Error('error while deleting user detail'))
  }
}


exports.multieDel = (req, res) => {
  try {
      const id = req.query;
      const count = Object.keys(id).length;
      for (let i = 0; i < count; i++) {
          CatagoryModel.findByIdAndRemove(Object.keys(id)[i], function(err) {
              if (err)
                  logger.error("err", err);
          });
      }
      res.redirect('/catagory');
  } catch (err) {
      logger.error("err", err);
  }
}

exports.updateCat = async(req, res) => {
  try {
      let { error } = catValidate(req.body);
      if (error) {
          if (error.details[0].context.key == 'name') {
              var err1 = error.details[0].message;
              res.render('catagoryEdit', {
                  error1: err1,
                  values: req.body
              });
          }

      } else {
          const userData = await CatagoryModel.findByIdAndUpdate(req.params.id, {
              name : req.body.name,
          });
          if (userData) {
              res.redirect('/catagory');
          }
      }
  } catch (err) {
      logger.error("err", err);
  }
};


