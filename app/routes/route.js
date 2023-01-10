const express = require('express');
const router = express.Router();
const {upload} = require('../services/multer');
const auth = require('../controllers/authController');
const { generateToken, authenticate } =  require('../helpers/auth')


router.get('/register', auth.register);
router.post('/register', upload.single('image'), auth.authregister);

router.get('/', auth.login);
router.post('/login',generateToken,auth.authUser);

router.get('/fpassword', auth.fpassword)
router.post('/fpassword', auth.verifyEmail)

router.get('/otp', auth.otp);
router.post("/verifyOtp", auth.verifyOtp);

router.get("/npassword", auth.npassword);
router.post("/npassword", auth.updatePassword)

router.get("/index", authenticate,auth.index)

router.get("/profile",authenticate,auth.viewProfile);

router.get("/editProfile", authenticate, auth.editProfile);
router.post("/editProfile", authenticate,upload.single("image"), auth.updateProfile);

router.get("/resetPassword", authenticate, auth.resetPassword);
router.post("/resetPass", authenticate, auth.resetPass);

router.get("/logout", authenticate, auth.logout);

module.exports = router;
