import { Email, Password, useFormContext } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";

export const LoginFormFields = () => {
  const [t] = useTranslation("form");
  const {
    register,
    getFieldState,
    formState: { errors, submitCount }, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useFormContext();

  return (
    <>
      <Email
        name="email"
        label={t("loginForm.label.email")}
        submitCount={submitCount}
      />
      <Password
        name="password"
        label={t("loginForm.label.password")}
        register={register}
        getFieldState={getFieldState}
        submitCount={submitCount}
      />
      <input type="submit" value={t("loginForm.label.login")} />
    </>
  );
};
