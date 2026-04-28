import { Email, FormActions, useFormContext } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";

interface Properties {
  loading?: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const UpdateEmailFormFields = ({
  loading,
  setModalVisible,
}: Properties) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isDirty },
  } = useFormContext();

  const { t } = useTranslation("user");
  return (
    <>
      <Email label={t("profile.accountInfo.newEmail")} name="email" />

      <FormActions
        actions={[
          {
            disabled: !isDirty,
            id: "submit",
            label: t("profile.button.update"),
          },
          {
            id: "cancel",
            label: t("profile.button.cancel"),
            onClick: () => setModalVisible(false),
            type: "button",
          },
        ]}
        alignment="right"
        loading={loading}
      />
    </>
  );
};
