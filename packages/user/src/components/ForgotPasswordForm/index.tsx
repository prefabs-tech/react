import { emailSchema, Provider } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import { ForgotPasswordFormFields } from "./ForgotPasswordFormFields";

interface Properties {
  email?: string;
  handleSubmit: (email: string) => void;
  loading?: boolean;
  onEmailChange?: (email: string) => void;
}

export const ForgotPasswordForm = ({
  email,
  handleSubmit,
  loading,
  onEmailChange,
}: Properties) => {
  const { i18n, t } = useTranslation("user");

  const ForgotPasswordFormSchema = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
  });

  return (
    <Provider
      defaultValues={{
        email,
      }}
      onSubmit={(data) => handleSubmit(data.email)}
      validationSchema={ForgotPasswordFormSchema}
      validationTriggerKey={i18n.language}
    >
      <ForgotPasswordFormFields
        loading={loading}
        onEmailChange={onEmailChange}
      />
    </Provider>
  );
};
