import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, ConfirmationModal, Page } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const ConfirmationModalDemo = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("confirmationModal.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <Button
          onClick={() => setShowModal(true)}
          label={t("confirmationModal.buttonLabel")}
        ></Button>
        <ConfirmationModal
          visible={showModal}
          message={t("confirmationModal.message")}
          header={t("confirmationModal.header")}
          onHide={() => setShowModal(false)}
        />
      </Section>
    </Page>
  );
};
