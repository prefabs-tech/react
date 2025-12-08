import {
  AdditionalFormFields,
  FormActions,
  TextInput,
  useFormContext,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";

interface Properties {
  additionalProfileFields?: AdditionalFormFields;
  submitting?: boolean;
  onCancel?: () => void;
}

export const ProfileFormFields = ({
  additionalProfileFields,
  submitting,
  onCancel,
}: Properties) => {
  const {
    reset,
    formState: { errors, submitCount, isDirty }, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useFormContext();

  const { t } = useTranslation("user");

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (onCancel) {
      event.preventDefault();
      onCancel && onCancel();
    } else {
      reset();
    }
  };

  return (
    <>
      <TextInput
        label={t("profile.form.firstName.label")}
        name="givenName"
        placeholder={t("profile.form.firstName.placeholder")}
        submitCount={submitCount}
      />
      <TextInput
        label={t("profile.form.middleNames.label")}
        name="middleNames"
        placeholder={t("profile.form.middleNames.placeholder")}
        submitCount={submitCount}
      />
      <TextInput
        label={t("profile.form.lastName.label")}
        name="surname"
        placeholder={t("profile.form.lastName.placeholder")}
        submitCount={submitCount}
      />

      {additionalProfileFields
        ? additionalProfileFields.renderFields(useFormContext)
        : null}

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("profile.button.update"),
            disabled: !isDirty,
          },
          {
            id: "cancel",
            label: t("profile.button.cancel"),
            type: "button",
            disabled: !isDirty,
            onClick: handleCancel,
          },
        ]}
        loading={submitting}
        alignment="left"
      />
    </>
  );
};
