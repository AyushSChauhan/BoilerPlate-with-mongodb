const express = require('express');
const router = express.Router();
const contact =require("../controllers/contactController");
const { generateToken, authenticate } =  require('../helpers/auth');

router.get('/contactUS', authenticate,contact.viewContact);

router.get('/contactAdd', authenticate,contact.contactAdd);
router.post('/contactAdd', authenticate,contact.addData);

router.get("/contactEdit/:id", authenticate,contact.contactEdit);
router.post("/updateContact/:id", authenticate, contact.updateContact);

router.get('/deleteContact/:id', authenticate, contact.deleteContact);
router.get("/multieDelete", authenticate, contact.multieDel);

module.exports = router;