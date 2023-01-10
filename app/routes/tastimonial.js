const express = require('express');
const router = express.Router();
const {upload} = require('../services/multer');
const testimonial =require("../controllers/testimonialController");
const { generateToken, authenticate } =  require('../helpers/auth');


router.get('/testimonial', authenticate, testimonial.tView)

router.get('/testimonialAdd',authenticate,testimonial.testimonialAdd);
router.post('/testimonialAdd',authenticate,upload.single("image"), testimonial.tAdd);

router.get('/testimonialEdit/:id',authenticate,upload.single("image"),testimonial.tEdit);
router.post('/testimonialUpdate/:id', authenticate,upload.single("image"), testimonial.testimonialUpdate);

router.get('/testimonialDelete/:id', authenticate, testimonial.tDelete);
router.get("/multiepleDelete", authenticate, testimonial.multieDel);


module.exports = router;