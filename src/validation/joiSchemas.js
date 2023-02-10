import Joi from "joi";
const joiPostalCode = Joi.extend(require("joi-postalcode"));

export const signUpSchema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
  phoneNumber: Joi.string().required(),
  range_preference: Joi.required(),
  postcode: joiPostalCode.string().postalCode("GB"),
  profilePicture: Joi.any(),
};

export const profileEditSchema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  user_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  range_preference: Joi.required(),
  postcode: joiPostalCode.string().postalCode("GB"),
};

export const addItemToListingSchema = {
  item_name: Joi.string().required(),
  quantity: Joi.string().required(),
  collection_location: Joi.string().required(),
};

export const loginSchema = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};
