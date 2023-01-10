var express = require('express');
const { TModel } = require("../helpers/db");
const { tValidate } = require("../validations/tValidate");
const logger = require('../loggers/logger');


exports.tView = async(req, res) => {
    try {
        const user = await TModel.find();

        if (user) {
            res.render('testimonial', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};


exports.testimonialAdd = async(req, res) => {
    res.render('testimonialAdd', {
        values: req.body,
    })
};

exports.tAdd = async(req, res) => {
    try {
        let { error } = tValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('testimonialAdd', {
                    error1: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'desg') {
                var err1 = error.details[0].message;
                return res.render('testimonialAdd', {
                    error2: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'desc') {
                var err1 = error.details[0].message;
                return res.render('testimonialAdd', {
                    error3: err1,
                    values: req.body,

                });
            }

        }
        console.log(req.file);
        const user = {
            name: req.body.name,
            desg: req.body.desg,
            desc: req.body.desc,
            image: req.file.filename
        }
        const userData = await new TModel(user)
        await userData.save().then(
            data => {
                res.redirect('/testimonial');
            });


    } catch (err) {
        logger.error("err", err)
    }
};

exports.tEdit = async(req, res) => {
    try {
        const user = await TModel.findById({ _id: req.params.id });
        if (user) {
            res.render('testimonialEdit', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.testimonialUpdate = async(req, res) => {
    try {
        let { error } = tValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'desg') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'desc') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error3: err1,
                    values: req.body
                });
            }

        } else {
            const userData = await TModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                desg: req.body.desg,
                desc: req.body.desc,
                image: req.file.filename,
            });
            if (userData) {
                res.redirect('/testimonial');
            }
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.tDelete = async (req, res, next) => {
    try {
      const user = await TModel.findById({ _id: req.params.id });
      await TModel.deleteOne(user)
      await res.redirect('/testimonial');
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
            TModel.findByIdAndRemove(Object.keys(id)[i], function(err) {
                if (err)
                    logger.error("err", err);
            });
        }
        res.redirect('/testimonial');
    } catch (err) {
        logger.error("err", err);
    }
  }