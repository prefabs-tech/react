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

const ResetPasswordFormFields = ({
  hasConfirmPasswordFeature,
  loading,
}: Properties) => {
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
        label={t("resetPassword.form.newPassword.label")}
        name="password"
        register={register}
        getFieldState={getFieldState}
      />
      {hasConfirmPasswordFeature && (
        <Password
          label={t("resetPassword.form.confirmPassword.label")}
          name="confirmPassword"
          register={register}
          getFieldState={getFieldState}
        />
      )}
      <FormActions
        actions={[
          {
            id: "submit",
            label: t("resetPassword.form.actions.submit"),
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};

export default ResetPasswordFormFields;
