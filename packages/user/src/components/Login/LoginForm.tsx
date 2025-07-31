import {
  Provider,
  emailSchema,
  passwordSchema,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import * as zod from "zod";

import { LoginFormFields } from "./LoginFormFields";
import { LoginCredentials } from "../../types";

interface Properties {
  handleSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
}

export const LoginForm = ({ handleSubmit, loading }: Properties) => {
  const { t, i18n } = useTranslation("user");

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
      validationSchema={LoginFormSchema}
      onSubmit={handleSubmit}
      validationTriggerKey={i18n.language}
    >
      <LoginFormFields loading={loading} />
    </Provider>
  );
};
