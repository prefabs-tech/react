import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Data } from "@prefabs.tech/react-ui";
import React, { useState } from "react";

import { useConfig, useUser } from "@/hooks";

import { UpdateEmailModal } from "./UpdateEmailModal";

export const AccountInfo = () => {
  const { t } = useTranslation("user");
  const { setUser, user } = useUser();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const config = useConfig();
  const canUpdateEmail = config.features?.updateEmail && !user?.thirdParty;

  return (
    <div className="account-info">
      <Data
        caption={t("profile.accountInfo.label")}
        className={`${canUpdateEmail ? "update-email" : ""}`}
        value={
          <>
            {user?.email}
            {canUpdateEmail && (
              <Button
                iconLeft="pi pi-pencil"
                label={t("profile.button.update")}
                onClick={() => setModalVisible(true)}
                severity="secondary"
                size="small"
                variant="textOnly"
              ></Button>
            )}
          </>
        }
      />
      {canUpdateEmail && (
        <UpdateEmailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setUser={setUser}
          user={user}
        />
      )}
    </div>
  );
};
