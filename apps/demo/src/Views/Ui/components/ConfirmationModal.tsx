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
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section>
        <Button
          label={t("confirmationModal.buttonLabel")}
          onClick={() => setShowModal(true)}
        ></Button>
        <ConfirmationModal
          header={t("confirmationModal.header")}
          message={t("confirmationModal.message")}
          onHide={() => setShowModal(false)}
          visible={showModal}
        />
      </Section>
    </Page>
  );
};
