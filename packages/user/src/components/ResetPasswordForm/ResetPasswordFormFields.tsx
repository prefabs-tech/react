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
    formState: { errors, isDirty, submitCount },
    getFieldState,
    register,
  } = useFormContext();

  return (
    <>
      <Password
        getFieldState={getFieldState}
        label={t("resetPassword.form.newPassword.label")}
        name="password"
        register={register}
      />
      {hasConfirmPasswordFeature && (
        <Password
          getFieldState={getFieldState}
          label={t("resetPassword.form.confirmPassword.label")}
          name="confirmPassword"
          register={register}
        />
      )}
      <FormActions
        actions={[
          {
            id: "submit",
            label: t("resetPassword.form.actions.submit"),
          },
        ]}
        alignment="fill"
        loading={loading}
      />
    </>
  );
};

export default ResetPasswordFormFields;
