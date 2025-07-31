import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, IButtonProperties, Modal } from "@prefabs.tech/react-ui";
import React, { useState } from "react";

import { InvitationForm } from "./InvitationForm";

import type {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  InvitationExpiryDateField,
} from "@/types";

interface Properties {
  additionalInvitationFields?: AdditionalFormFields;
  apps?: InvitationAppOption[];
  expiryDateField?: InvitationExpiryDateField;
  invitationButtonOptions?: IButtonProperties;
  onSubmitted?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareData?: (data: any) => any;
  roles?: InvitationRoleOption[];
}

export const InvitationModal = ({
  additionalInvitationFields,
  apps,
  expiryDateField,
  invitationButtonOptions,
  onSubmitted,
  prepareData,
  roles,
}: Properties) => {
  const { t } = useTranslation("invitations");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-content-center">
      <Button
        label={t("modal.button.label")}
        onClick={() => setModalVisible(true)}
        {...invitationButtonOptions}
      />
      <Modal
        className="invitation-modal"
        header={t("modal.dialog.header")}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <InvitationForm
          additionalInvitationFields={additionalInvitationFields}
          apps={apps}
          expiryDateField={expiryDateField}
          onCancel={() => {
            setModalVisible(false);
          }}
          onSubmitted={(data) => {
            if (onSubmitted) {
              onSubmitted(data);
            }

            setModalVisible(false);
          }}
          prepareData={prepareData}
          roles={roles}
        />
      </Modal>
    </div>
  );
};
