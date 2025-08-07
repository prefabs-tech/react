import {
  Email,
  FormActions,
  Password,
  useFormContext,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { useEffect } from "react";

interface Properties {
  loading?: boolean;
  onEmailChange?: (email: string) => void;
}
export const LoginFormFields = ({ loading, onEmailChange }: Properties) => {
  const { t } = useTranslation("user");

  const {
    register,
    getFieldState,
    watch,
    formState: { errors, submitCount }, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useFormContext();

  const emailValue = watch("email");

  useEffect(() => {
    if (onEmailChange) {
      onEmailChange(emailValue);
    }
  }, [emailValue, onEmailChange]);

  return (
    <>
      <Email
        label={t("login.form.email.label")}
        name="email"
        placeholder={t("login.form.email.placeholder")}
        submitCount={submitCount}
        showValidState={false}
      />
      <Password
        autoComplete="current-password"
        label={t("login.form.password.label")}
        name="password"
        submitCount={submitCount}
        register={register}
        getFieldState={getFieldState}
        showValidState={false}
      />

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("login.form.actions.submit"),
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};
