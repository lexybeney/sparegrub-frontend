import { jValidate } from "./joi";
import {
  signUpSchema,
  addItemToListingSchema,
  loginSchema,
} from "./joiSchemas";

export const validate = (type, payload) => {
  switch (type) {
    case "Signup":
      return jValidate(signUpSchema, payload);

    case "Login":
      return jValidate(loginSchema, payload);

    case "Add item to listing":
      return jValidate(addItemToListingSchema, payload);

    case "Profile edit":
      return jValidate(signUpSchema, payload);

    default:
      console.log("Invalid type for validation sent in");
      break;
  }
};
