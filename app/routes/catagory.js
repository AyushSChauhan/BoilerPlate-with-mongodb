const express = require('express');
const router = express.Router();
const catagory =require("../controllers/catagoryController");
const { generateToken, authenticate } =  require('../helpers/auth');

router.get('/catagory', authenticate,catagory.viewCatagory);

router.get('/catagoryAdd', authenticate,catagory.catagoryAdd);
router.post('/catagoryAdd', authenticate,catagory.addData);

router.get("/deleteCat/:id",authenticate,catagory.deleteCat);
router.get("/multieDel", authenticate, catagory.multieDel);

router.get("/editcat/:id", authenticate,catagory.editcat);

router.get("/updateCat/:id", authenticate, catagory.updateCat);
router.post("/updateCat/:id", authenticate, catagory.updateCat);



module.exports = router;