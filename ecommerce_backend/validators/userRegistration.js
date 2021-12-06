const { check, validationResult } = require("express-validator");

exports.validate = [
  check("email").exists().withMessage("Email is must"),
  check("fullname").exists().withMessage("FullName is must").trim().escape(),

  check("role")
    .exists()
    .withMessage("role is must")
    .isIn("user", "admin")
    .withMessage("Role can either be user or admin"),
  check("gender")
    .exists()
    .withMessage("Gender is must")
    .isIn("male", "female", "other")
    .withMessage("Gender cannot be other than male,female or other"),
  check("age")
    .exists()
    .withMessage("Age is must")
    .isInt()
    .withMessage("Age must be a number"),
  // .custom((value,{req}) => {

  //       //write some code to test age with dob
  // }),
  // check('mobile_number')
  //      .exists()
  //      .isMobilePhone('Enter correct mobile number'),
  check("password")
    .exists()
    .withMessage("Password is must")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Please enter a Strong Password"),

  function (req, res, next) {
    const error = validationResult(req);
    // console.log('logging');
    // console.log(error.array());
    //  {
    //           value: undefined,
    //           msg: 'Email is must',
    //           param: 'email',
    //           location: 'body'
    //  },
    if (error.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    error.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
      errors: extractedErrors,
    });
  },
];
exports.validate = [];
