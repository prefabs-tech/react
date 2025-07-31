import { useTranslation } from "@prefabs.tech/react-i18n";
import { Modal } from "@prefabs.tech/react-ui";

import { UpdateEmailForm } from "./UpdateEmailForm";
import { UserType } from "../../types";

interface Properties {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  user: UserType | null;
  setUser: (user: UserType) => void;
}

export const UpdateEmailModal = ({
  modalVisible,
  setModalVisible,
  user,
  setUser,
}: Properties) => {
  const { t } = useTranslation("user");

  return (
    <Modal
      className="update-email-modal"
      header={t("profile.accountInfo.title")}
      visible={modalVisible}
      onHide={() => setModalVisible(false)}
    >
      <UpdateEmailForm
        user={user}
        setModalVisible={setModalVisible}
        setUser={setUser}
      />
    </Modal>
  );
};
