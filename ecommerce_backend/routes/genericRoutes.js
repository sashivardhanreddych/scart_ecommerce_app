const exp = require('express');
const router = exp.Router();
const genericController = require("./../controllers/genericController");

const signupValidator = require('./../validators/userRegistration').validate;
// console.log(signupValidator);

router.route("/signup").post(genericController.signup);


module.exports = router;