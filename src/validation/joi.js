import Joi from "joi";

export const jValidate = (schema, payload) => {
  const j = Joi.object(schema);
  const r = j.validate(payload, { abortEarly: false, allowUnknown: true });

  if (!r.error) {
    return true;
  } else {
    const errorsMod = {};

    const capitaliseFirstletter = (message) => {
      return message.charAt(1).toUpperCase() + message.slice(2);
    };

    r.error.details.forEach((error) => {
      const errorMessage = capitaliseFirstletter(
        error.message.replace(/"/g, " ")
      );
      errorsMod[error.context.key] = errorMessage;
    });

    return errorsMod;
  }
};
