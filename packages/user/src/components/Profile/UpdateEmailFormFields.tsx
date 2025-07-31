import { Email, useFormContext, FormActions } from "@prefabs.tech/react-form";
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
            id: "submit",
            label: t("profile.button.update"),
            disabled: !isDirty,
          },
          {
            id: "cancel",
            label: t("profile.button.cancel"),
            type: "button",
            onClick: () => setModalVisible(false),
          },
        ]}
        alignment="right"
        loading={loading}
      />
    </>
  );
};
