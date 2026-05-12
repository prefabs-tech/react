import {
  FormActions,
  Password,
  useFormContext,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";

interface Properties {
  hasConfirmPasswordFeature?: boolean;
  loading?: boolean;
}

const ChangePasswordFormFields = ({
  hasConfirmPasswordFeature,
  loading,
}: Properties) => {
  const { t } = useTranslation("user");

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isDirty, submitCount },
    getFieldState,
    register,
  } = useFormContext();

  return (
    <>
      <Password
        autoComplete="current-password"
        getFieldState={getFieldState}
        label={t("changePassword.form.currentPassword.label")}
        name="oldPassword"
        register={register}
      />
      <Password
        getFieldState={getFieldState}
        label={t("changePassword.form.newPassword.label")}
        name="password"
        register={register}
      />
      {hasConfirmPasswordFeature && (
        <Password
          getFieldState={getFieldState}
          label={t("changePassword.form.confirmPassword.label")}
          name="confirmPassword"
          register={register}
        />
      )}

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("changePassword.form.actions.submit"),
          },
        ]}
        alignment="left"
        loading={loading}
      />
    </>
  );
};

export default ChangePasswordFormFields;
