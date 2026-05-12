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
    formState: { errors, submitCount }, // eslint-disable-line @typescript-eslint/no-unused-vars
    getFieldState,
    register,
    watch,
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
        showValidState={false}
        submitCount={submitCount}
      />
      <Password
        autoComplete="current-password"
        getFieldState={getFieldState}
        label={t("login.form.password.label")}
        name="password"
        register={register}
        showValidState={false}
        submitCount={submitCount}
      />

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("login.form.actions.submit"),
          },
        ]}
        alignment="fill"
        loading={loading}
      />
    </>
  );
};
