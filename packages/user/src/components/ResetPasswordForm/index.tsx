import { Provider } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import ResetPasswordFormFields from "./ResetPasswordFormFields";
import { PasswordConfirmationSchema } from "../schemas";

import { useConfig } from "@/hooks";

interface Properties {
  handleSubmit: (newPassword: string) => void;
  loading?: boolean;
}

export const ResetPasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t, i18n } = useTranslation("user");
  const config = useConfig();
  const hasConfirmPasswordFeature = config?.features?.confirmPassword ?? false;

  let ResetPasswordFormSchema = zod.object({
    ...PasswordConfirmationSchema({
      passwordRequiredMessage: t(
        "resetPassword.messages.validation.newPassword",
      ),
      passwordValidationMessage: t(
        "resetPassword.messages.validation.validationMessage",
      ),
      confirmPasswordRequiredMessage: t(
        "resetPassword.messages.validation.confirmPassword",
      ),
      hasConfirmPasswordFeature,
    }),
  });

  if (hasConfirmPasswordFeature) {
    ResetPasswordFormSchema = ResetPasswordFormSchema.refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("resetPassword.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      },
    ) as unknown as typeof ResetPasswordFormSchema;
  }

  return (
    <Provider
      validationSchema={ResetPasswordFormSchema}
      onSubmit={(data) => handleSubmit(data.password)}
      validationTriggerKey={i18n.language}
    >
      <ResetPasswordFormFields
        hasConfirmPasswordFeature={hasConfirmPasswordFeature}
        loading={loading}
      />
    </Provider>
  );
};
