import { Provider, emailSchema } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import { ForgotPasswordFormFields } from "./ForgotPasswordFormFields";

interface Properties {
  email?: string;
  loading?: boolean;
  handleSubmit: (email: string) => void;
  onEmailChange?: (email: string) => void;
}

export const ForgotPasswordForm = ({
  email,
  loading,
  handleSubmit,
  onEmailChange,
}: Properties) => {
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
      defaultValues={{
        email,
      }}
    >
      <ForgotPasswordFormFields
        onEmailChange={onEmailChange}
        loading={loading}
      />
    </Provider>
  );
};
