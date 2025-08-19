import { FormActions, Email, useFormContext } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React, { useEffect } from "react";

interface Properties {
  loading?: boolean;
  setEmail?: (email: string) => void;
}

export const ForgotPasswordFormFields = ({ loading, setEmail }: Properties) => {
  const { t } = useTranslation("user");

  const {
    watch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, submitCount },
  } = useFormContext();

  const emailValue = watch("email");

  useEffect(() => {
    if (setEmail) {
      setEmail(emailValue);
    }
  }, [emailValue]);

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
            disabled: !emailValue,
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};
