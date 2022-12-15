import { jValidate } from "./joi";
import { userInformationSchema, addItemToListingSchema } from "./joiSchemas";

export const validate = (type, payload) => {
  switch (type) {
    case "User Information":
      return jValidate(userInformationSchema, payload);

    case "Add item to listing":
      return jValidate(addItemToListingSchema, payload);

    default:
      console.log("Invalid type for validation sent in");
      break;
  }
};
