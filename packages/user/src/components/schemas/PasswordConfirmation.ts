import { passwordSchema } from "@prefabs.tech/react-form";
import * as zod from "zod";

interface PasswordConfirmationSchema {
  passwordValidationMessage?: string;
  passwordRequiredMessage?: string;
  confirmPasswordRequiredMessage?: string;
}

const schema = ({
  passwordValidationMessage = "validation.messages.passwordValidation",
  passwordRequiredMessage = "validation.messages.requiredField",
  confirmPasswordRequiredMessage = "validation.messages.requiredField",
}: PasswordConfirmationSchema) => {
  return {
    password: passwordSchema(
      {
        required: passwordRequiredMessage,
        weak: passwordValidationMessage,
      },
      {
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        minUppercase: 1,
      },
    ),
    confirmPassword: zod.string().min(1, confirmPasswordRequiredMessage),
  };
};

export default schema;
