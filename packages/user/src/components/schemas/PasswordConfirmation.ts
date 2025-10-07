import { passwordSchema } from "@prefabs.tech/react-form";
import * as zod from "zod";

interface PasswordConfirmationSchema {
  confirmPasswordRequiredMessage?: string;
  hasConfirmPasswordFeature?: boolean;
  passwordRequiredMessage?: string;
  passwordValidationMessage?: string;
}

const schema = ({
  confirmPasswordRequiredMessage = "validation.messages.requiredField",
  hasConfirmPasswordFeature = false,
  passwordRequiredMessage = "validation.messages.requiredField",
  passwordValidationMessage = "validation.messages.passwordValidation",
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
    ...(hasConfirmPasswordFeature && {
      confirmPassword: zod.string().min(1, confirmPasswordRequiredMessage),
    }),
  };
};

export default schema;
