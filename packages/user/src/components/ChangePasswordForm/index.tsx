import { Provider, FormSubmitOptions } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import ChangePasswordFormFields from "./ChangePasswordFormFields";
import { PasswordConfirmationSchema } from "../schemas";

import { useConfig } from "@/hooks";
import { ChangePasswordFormData } from "@/views/ChangePassword";

interface Properties {
  handleSubmit: (
    data: ChangePasswordFormData,
    options?: FormSubmitOptions,
  ) => void;
  loading?: boolean;
}

export const ChangePasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { t, i18n } = useTranslation("user");
  const config = useConfig();
  const hasConfirmPasswordFeature = config?.features?.confirmPassword ?? false;

  let ChangePasswordFormSchema = zod.object({
    oldPassword: zod
      .string()
      .nonempty(t("changePassword.messages.validation.currentPassword")),
    ...PasswordConfirmationSchema({
      passwordValidationMessage: t(
        "changePassword.messages.validation.mustContain",
      ),
      passwordRequiredMessage: t(
        "changePassword.messages.validation.newPassword",
      ),
      confirmPasswordRequiredMessage: t(
        "changePassword.messages.validation.confirmPassword",
      ),
      hasConfirmPasswordFeature,
    }),
  });

  if (hasConfirmPasswordFeature) {
    ChangePasswordFormSchema = ChangePasswordFormSchema.refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: t("changePassword.messages.validation.mustMatch"),
        path: ["confirmPassword"],
      },
    ) as unknown as typeof ChangePasswordFormSchema;
  }

  return (
    <Provider
      validationSchema={ChangePasswordFormSchema}
      onSubmit={(data: ChangePasswordFormData, options?: FormSubmitOptions) =>
        handleSubmit(
          { oldPassword: data.oldPassword, password: data.password },
          options,
        )
      }
      validationTriggerKey={i18n.language}
    >
      <ChangePasswordFormFields
        hasConfirmPasswordFeature={hasConfirmPasswordFeature}
        loading={loading}
      />
    </Provider>
  );
};
