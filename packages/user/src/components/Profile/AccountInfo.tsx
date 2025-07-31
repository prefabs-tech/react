import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Data } from "@prefabs.tech/react-ui";
import React, { useState } from "react";

import { useConfig, useUser } from "@/hooks";

import { UpdateEmailModal } from "./UpdateEmailModal";

export const AccountInfo = () => {
  const { t } = useTranslation("user");
  const { user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const config = useConfig();
  const canUpdateEmail = config.features?.updateEmail && !user?.thirdParty;

  return (
    <div className="account-info">
      <Data
        className={`${canUpdateEmail ? "update-email" : ""}`}
        caption={t("profile.accountInfo.label")}
        value={
          <>
            {user?.email}
            {canUpdateEmail && (
              <Button
                variant="textOnly"
                label={t("profile.button.update")}
                severity="secondary"
                size="small"
                iconLeft="pi pi-pencil"
                onClick={() => setModalVisible(true)}
              ></Button>
            )}
          </>
        }
      />
      {canUpdateEmail && (
        <UpdateEmailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
};
