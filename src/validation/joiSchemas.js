import Joi from "joi";
const joiPostalCode = Joi.extend(require("joi-postalcode"));

export const signUpSchema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
  phoneNumber: Joi.string().required(),
  range: Joi.required(),
  postcode: joiPostalCode.string().postalCode("GB"),
  profilePicture: Joi.any(),
};

export const addItemToListingSchema = {
  item: Joi.string().required(),
  quantity: Joi.string().required(),
  location: Joi.string().required(),
};

export const loginSchema = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};
