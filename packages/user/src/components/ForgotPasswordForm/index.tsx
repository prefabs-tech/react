import { Provider, emailSchema } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import { ForgotPasswordFormFields } from "./ForgotPasswordFormFields";

interface Properties {
  handleSubmit: (email: string) => void;
  loading?: boolean;
}

export const ForgotPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t, i18n } = useTranslation("user");

  const ForgotPasswordFormSchema = zod.object({
    email: emailSchema({
      required: t("validation.messages.email"),
      invalid: t("validation.messages.validEmail"),
    }),
  });

  return (
    <Provider
      validationSchema={ForgotPasswordFormSchema}
      onSubmit={(data) => handleSubmit(data.email)}
      validationTriggerKey={i18n.language}
    >
      <ForgotPasswordFormFields loading={loading} />
    </Provider>
  );
};
