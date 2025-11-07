import {
  FormActions,
  Password,
  useFormContext,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";

interface Properties {
  loading?: boolean;
}

const ChangePasswordFormFields = ({ loading }: Properties) => {
  const { t } = useTranslation("user");

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, submitCount, isDirty },
    register,
    getFieldState,
  } = useFormContext();

  return (
    <>
      <Password
        autoComplete="current-password"
        label={t("changePassword.form.currentPassword.label")}
        name="oldPassword"
        register={register}
        getFieldState={getFieldState}
      />
      <Password
        label={t("changePassword.form.newPassword.label")}
        name="password"
        register={register}
        getFieldState={getFieldState}
      />
      <Password
        label={t("changePassword.form.confirmPassword.label")}
        name="confirmPassword"
        register={register}
        getFieldState={getFieldState}
      />

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("changePassword.form.actions.submit"),
          },
        ]}
        loading={loading}
        alignment="left"
      />
    </>
  );
};

export default ChangePasswordFormFields;
