var express = require('express');
const { PortfolioModel, CatagoryModel } = require("../helpers/db");
const { portfolioValidate } = require("../validations/portfolioValidate");
const logger = require('../loggers/logger');


exports.portfolio = async (req, res) => {
    res.render('portfolio', {
        values: req.body,
    })
}

exports.showPortfolio = async (req, res) => {
    try {
        const user = await CatagoryModel.find();

        if (user) {
            res.render('portfolioAdd', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.viewPortfolio = async (req, res) => {
    try {

        const user = await PortfolioModel.aggregate([
            {
                "$addFields": {
                  "catagory": {
                    "$toObjectId": "$catagory"
                  }
                }
              },{
            $lookup: {
                from: "catagories",
                localField: "catagory",
                foreignField: "_id",
                as: "catagoryInfo"
            }
        },
        {$unwind: "$catagoryInfo"}
        ]);
        if (user) {
            console.log("user", user[0].catagoryInfo);
            res.render('portfolio', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};


exports.portfolioAdd = async (req, res) => {
    try {
        const result = await CatagoryModel.find();
        if (result) {
            res.render('portfolioAdd', {
                values: result
            })
        }

    } catch (err) {
        logger.error(err);
    }

}

exports.addPortfolio = async (req, res) => {
    try {
        let { error } = portfolioValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'catagory') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error1: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error2: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'title') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error3: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error4: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'url') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error5: err1,
                    values: req.body,

                });
            }
        }

        const multipleImage = req.files.map(Image => Image.filename);
        const user = {
            catagory: req.body.catagory,
            name: req.body.name,
            image: multipleImage,
            title: req.body.title,
            date: req.body.date,
            url: req.body.url,
        }
        const userData = await new PortfolioModel(user)
        await userData.save().then(
            data => {
                res.redirect('/portfolio');
            });

    } catch (err) {
        logger.error("err", err)

    }
};


exports.showEditPortfolio = async (req, res) => {
    try {
        const categoryUser = await CatagoryModel.find();

        const user = await PortfolioModel.findById(req.params.id);

        if (user && categoryUser) {
            res.render('portfolioEdit', {
                values: user,
                cat: categoryUser
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};


exports.updatePortfolio = async (req, res) => {
    try {
        let { error } = portfolioValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'catagory') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error1: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error2: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'title') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error3: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error4: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'url') {
                var err1 = error.details[0].message;
                return res.render('portfolioAdd', {
                    error6: err1,
                    values: req.body,

                });
            }
        }

        const multipleImage = req.files.map(Image => Image.filename);
        const userData = await PortfolioModel.findByIdAndUpdate(req.params.id, {
            catagory: req.body.catagory,
            name: req.body.name,
            image: multipleImage,
            title: req.body.title,
            date: req.body.date,
            url: req.body.url,
        });
        if (userData) {
            res.redirect('/portfolio');
        }

    } catch (err) {
        logger.error("err", err)

    }
};


exports.deletePortfolio = async (req, res) => {
    try {

        const user = await PortfolioModel.findById({ _id: req.params.id });
        await PortfolioModel.deleteOne(user);
        await res.redirect('/portfolio');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeletePortfolio = (req, res) => {
    try {

        const id = req.query;
        const count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            PortfolioModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/portfolio');

    } catch (err) {
        logger.error("err", err);
    }
}
