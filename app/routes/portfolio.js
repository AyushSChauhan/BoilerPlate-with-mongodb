const express = require('express');
const router = express.Router();
const {upload} = require('../services/multer');
const portfolio = require('../controllers/portfolioController');
const { generateToken, authenticate } =  require('../helpers/auth')



router.get("/portfolio", authenticate, portfolio.viewPortfolio);
router.get("/showPortfolio", authenticate, portfolio.showPortfolio);

router.get("/portfolioAdd", authenticate, portfolio.portfolioAdd);
router.post("/addPortfolio", authenticate,upload.array("image", 2), portfolio.addPortfolio);

router.get("/portfolioEdit/:id", authenticate, portfolio.showEditPortfolio);


router.get("/deletePortfolio/:id", authenticate, portfolio.deletePortfolio);


router.get("/multiDeletePortfolio", authenticate, portfolio.multiDeletePortfolio);
router.post("/updatePortfolio/:id", authenticate, upload.array("image",2), portfolio.updatePortfolio);

module.exports = router;