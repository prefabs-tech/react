import validator from "validator";
import { z } from "zod";

import type { EmailErrorMessages } from "../types";
import type { IsEmailOptions } from "../types/validator";

const schema = (
  errorMessages: EmailErrorMessages = {
    invalid: "Please provide a valid email address",
    required: "Email address is required",
  },
  options?: IsEmailOptions,
) => {
  return z
    .string()
    .nonempty({
      message: errorMessages.required,
    })
    .refine(
      (value) => validator.isEmail(value, options || {}),

      errorMessages.invalid,
    );
};

export default schema;
