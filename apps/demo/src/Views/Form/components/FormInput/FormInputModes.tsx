import { SwitchInput } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";

type Properties = {
  filled: boolean;
};

export const FormInputModes = ({ filled }: Properties) => {
  const [t] = useTranslation("form");

  return (
    <>
      <span className="form-mode-title">{t("formInput.subTitle")}</span>
      <div className="form-modes">
        <SwitchInput
          label={
            filled
              ? t("formInput.label.transparent")
              : t("formInput.label.filled")
          }
          name="filled"
        />
        <SwitchInput label={t("formInput.label.valid")} name="valid" />
        <SwitchInput label={t("formInput.label.invalid")} name="invalid" />
      </div>
    </>
  );
};
