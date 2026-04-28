import { Email, Password, useFormContext } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";

export const LoginFormFields = () => {
  const [t] = useTranslation("form");
  const {
    formState: { errors, submitCount }, // eslint-disable-line @typescript-eslint/no-unused-vars
    getFieldState,
    register,
  } = useFormContext();

  return (
    <>
      <Email
        label={t("loginForm.label.email")}
        name="email"
        submitCount={submitCount}
      />
      <Password
        getFieldState={getFieldState}
        label={t("loginForm.label.password")}
        name="password"
        register={register}
        submitCount={submitCount}
      />
      <input type="submit" value={t("loginForm.label.login")} />
    </>
  );
};
