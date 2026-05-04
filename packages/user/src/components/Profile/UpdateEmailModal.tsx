import { useTranslation } from "@prefabs.tech/react-i18n";
import { Modal } from "@prefabs.tech/react-ui";

import { UserType } from "../../types";
import { UpdateEmailForm } from "./UpdateEmailForm";

interface Properties {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setUser: (user: UserType) => void;
  user: null | UserType;
}

export const UpdateEmailModal = ({
  modalVisible,
  setModalVisible,
  setUser,
  user,
}: Properties) => {
  const { t } = useTranslation("user");

  return (
    <Modal
      className="update-email-modal"
      header={t("profile.accountInfo.title")}
      onHide={() => setModalVisible(false)}
      visible={modalVisible}
    >
      <UpdateEmailForm
        setModalVisible={setModalVisible}
        setUser={setUser}
        user={user}
      />
    </Modal>
  );
};
