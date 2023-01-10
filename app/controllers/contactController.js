var express = require('express');
const { ContactModel } = require("../helpers/db");
const { contactValidate } = require("../validations/contactValidate");
const logger = require('../loggers/logger');

exports.viewContact = async (req, res) => {
    try {
        const user = await ContactModel.find();
        console.log("user", user);
        if (user) {
            res.render("contactUs", {
                values: user,
            });
        }
    } catch (err) {
        logger.error(err);
    }
};



exports.contactAdd = (req, res) => {
    res.render('contactAdd');
}

exports.addData = async(req, res, next) => {

    try {
        let { error } = contactValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('contactAdd', {
                    error1: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('contactAdd', {
                    error2: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'phone') {
                var err1 = error.details[0].message;
                return res.render('contactAdd', {
                    error3: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == ' message') {
                var err1 = error.details[0].message;
                return res.render('contactAdd', {
                    error4: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('contactAdd', {
                    error6: err1,
                    values: req.body,

                });
            }
        }

        const user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
            date: req.body.date
        }
        const userData = await new ContactModel(user)
        await userData.save().then(
            data => {
                res.redirect('/contactUs');
            });


    } catch (err) {
        logger.error("err", err)

    }
};



exports.contactEdit = async (req, res) => {
    try {
        const user = await ContactModel.findById({ _id: req.params.id });
        if (user) {
            res.render('contactEdit', {
                values: user
            });
        }
    } catch (err) {
        next(new Error('error while deleting user detail'))
    }
};


exports.updateContact = async (req, res) => {

    try {
        let { error } = contactValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                res.render('contactEdit', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                res.render('contactEdit', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'phone') {
                var err1 = error.details[0].message;
                res.render('contactEdit', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'message') {
                var err1 = error.details[0].message;
                res.render('contactEdit', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                res.render('contactEdit', {
                    error5: err1,
                    values: req.body
                });
            }
        } else {
            const userData = await ContactModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message,
                date: req.body.date
            });
            if (userData) {
                res.redirect('/contactUs');
            }
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.deleteContact = async (req, res, next) => {
    try {
      const user = await ContactModel.findById({ _id: req.params.id });
      await ContactModel.deleteOne(user)
      await res.redirect('/contactUs');
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
            ContactModel.findByIdAndRemove(Object.keys(id)[i], function(err) {
                if (err)
                    logger.error("err", err);
            });
        }
        res.redirect('/contactUs');
    } catch (err) {
        logger.error("err", err);
    }
  }