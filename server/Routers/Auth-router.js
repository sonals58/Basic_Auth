const express = require("express");
const router  = express.Router();
const authcontrollers = require("../Controllers/Auth-controller");
const validate= require("../Middlewares/validate-middleware");
const signupSchema= require("../Validators/Auth-validator");

 router.route('/').post(authcontrollers.home);
 router.route('/register').post(validate(signupSchema), authcontrollers.registeration);
 router.route('/login').post(authcontrollers.login);

 module.exports= router;
 