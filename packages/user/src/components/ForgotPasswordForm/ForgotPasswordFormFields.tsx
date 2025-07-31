import { FormActions, Email, useFormContext } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";

interface Properties {
  loading?: boolean;
}

export const ForgotPasswordFormFields = ({ loading }: Properties) => {
  const { t } = useTranslation("user");

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, submitCount, isDirty },
  } = useFormContext();

  return (
    <>
      <Email
        label={t("forgotPassword.form.email.label")}
        name="email"
        placeholder={t("forgotPassword.form.email.placeholder")}
      />

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("forgotPassword.form.actions.submit"),
            disabled: !isDirty,
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};
