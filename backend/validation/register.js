const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.isActivated = !isEmpty(data.isActivated) ? data.isActivated : true;
  data.cellNo = !isEmpty(data.cellNo) ? data.cellNo : "";

  if(Validator.isEmpty(data.name)) {
    errors.name = "First name is required";
  }
  if(Validator.isEmpty(data.surname)) {
    error.surname = "Surname is required";
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email address"
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters long";
  }

  if(Validator.isEmpty(data.cellNo)) {
    errors.cellNo = "Cell Number required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
