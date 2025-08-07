import { Provider, emailSchema } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import { useLocation } from "react-router-dom";
import * as zod from "zod";

import { ForgotPasswordFormFields } from "./ForgotPasswordFormFields";

interface Properties {
  handleSubmit: (email: string) => void;
  loading?: boolean;
}

export const ForgotPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t, i18n } = useTranslation("user");

  const location = useLocation();

  const searchParameters = new URLSearchParams(location.search);
  const email = searchParameters.get("email");

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
      defaultValues={{
        email: email,
      }}
    >
      <ForgotPasswordFormFields loading={loading} />
    </Provider>
  );
};
