import { FormSubmitOptions, Provider } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";
import * as zod from "zod";

import { useConfig } from "@/hooks";
import { ChangePasswordFormData } from "@/views/ChangePassword";

import { PasswordConfirmationSchema } from "../schemas";
import ChangePasswordFormFields from "./ChangePasswordFormFields";

interface Properties {
  handleSubmit: (
    data: ChangePasswordFormData,
    options?: FormSubmitOptions,
  ) => void;
  loading?: boolean;
}

export const ChangePasswordForm = ({ handleSubmit, loading }: Properties) => {
  const { i18n, t } = useTranslation("user");
  const config = useConfig();
  const hasConfirmPasswordFeature = config?.features?.confirmPassword ?? false;

  let ChangePasswordFormSchema = zod.object({
    oldPassword: zod
      .string()
      .nonempty(t("changePassword.messages.validation.currentPassword")),
    ...PasswordConfirmationSchema({
      confirmPasswordRequiredMessage: t(
        "changePassword.messages.validation.confirmPassword",
      ),
      hasConfirmPasswordFeature,
      passwordRequiredMessage: t(
        "changePassword.messages.validation.newPassword",
      ),
      passwordValidationMessage: t(
        "changePassword.messages.validation.mustContain",
      ),
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
      onSubmit={(data: ChangePasswordFormData, options?: FormSubmitOptions) =>
        handleSubmit(
          { oldPassword: data.oldPassword, password: data.password },
          options,
        )
      }
      validationSchema={ChangePasswordFormSchema}
      validationTriggerKey={i18n.language}
    >
      <ChangePasswordFormFields
        hasConfirmPasswordFeature={hasConfirmPasswordFeature}
        loading={loading}
      />
    </Provider>
  );
};
