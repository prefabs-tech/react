import {
  emailSchema,
  passwordSchema,
  Provider,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import * as zod from "zod";

import { LoginCredentials } from "../../types";
import { LoginFormFields } from "./LoginFormFields";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
  onEmailChange?: (email: string) => void;
}

export const LoginForm = ({
  handleSubmit,
  loading,
  onEmailChange,
}: Properties) => {
  const { i18n, t } = useTranslation("user");

  const LoginFormSchema = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
    password: passwordSchema(
      {
        required: t("login.messages.validation.password"),
        weak: "",
      },
      {
        minLength: 0,
      },
    ),
  });

  return (
    <Provider
      onSubmit={handleSubmit}
      validationSchema={LoginFormSchema}
      validationTriggerKey={i18n.language}
    >
      <LoginFormFields loading={loading} onEmailChange={onEmailChange} />
    </Provider>
  );
};
