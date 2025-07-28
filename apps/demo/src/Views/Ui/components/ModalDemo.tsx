import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Modal, Page } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const Header = () => {
  const [t] = useTranslation("ui");

  return <h2>{t("modal.usage.headerAsFC")}</h2>;
};

export const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);
  const [isOpen4, setIsOpen4] = useState<boolean>(false);

  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <Page
      title={t("modal.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Modal" })}</p>
        <CodeBlock exampleCode='import { Modal } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("modal.usage.withoutHeader")}>
        <Button label="Open modal" onClick={() => setIsOpen(true)}></Button>
        <Modal onHide={() => setIsOpen(false)} visible={isOpen}>
          <p style={{ lineHeight: 1.6 }}>{content}</p>
        </Modal>
        <CodeBlock
          exampleCode='const [isOpen, setIsOpen] = useState<boolean>(false);

<Button
  label="Open modal"
  onClick={() => setIsOpen(true)}
  ></Button>
<Modal onHide={() => setIsOpen(false)} visible={isOpen}>
  <p style={{ lineHeight: 1.6 }}>Lorem ipsum ...</p>
</Modal>'
        />
      </Section>
      <Section title={t("modal.usage.withHeader")}>
        <Button label="Open modal" onClick={() => setIsOpen2(true)}></Button>
        <Modal
          header={t("modal.header")}
          onHide={() => setIsOpen2(false)}
          visible={isOpen2}
        >
          <p style={{ lineHeight: 1.6 }}>{content}</p>
        </Modal>
        <CodeBlock
          exampleCode='const [isOpen, setIsOpen] = useState<boolean>(false);

<Button
  label="Open modal"
  onClick={() => setIsOpen(true)}
  ></Button>
<Modal
  header={t("modal.header")}
  onHide={() => setIsOpen(false)}
  visible={isOpen}
>
  <p style={{ lineHeight: 1.6 }}>Lorem ipsum ...</p>
</Modal>'
        />
      </Section>
      <Section title={t("modal.usage.headerAsFC")}>
        <Button label="Open modal" onClick={() => setIsOpen3(true)}></Button>
        <Modal
          header={<Header />}
          onHide={() => setIsOpen3(false)}
          visible={isOpen3}
        >
          <p style={{ lineHeight: 1.6 }}>{content}</p>
        </Modal>
        <CodeBlock
          exampleCode='const [isOpen, setIsOpen] = useState<boolean>(false);

<Button
  label="Open modal"
  onClick={() => setIsOpen(true)}
  ></Button>
<Modal
  header={<Header />}
  onHide={() => setIsOpen(false)}
  visible={isOpen}
>
  <p style={{ lineHeight: 1.6 }}>Lorem ipsum ...</p>
</Modal>'
        />
      </Section>
      <Section title={t("modal.usage.size")}>
        <Button label="Open modal" onClick={() => setIsOpen4(true)}></Button>
        <Modal
          header={<Header />}
          onHide={() => setIsOpen4(false)}
          size="large"
          visible={isOpen4}
        >
          <p style={{ lineHeight: 1.6 }}>{content}</p>
        </Modal>
        <CodeBlock
          exampleCode='const [isOpen, setIsOpen] = useState<boolean>(false);

<Button
  label="Open modal"
  onClick={() => setIsOpen(true)}
  ></Button>
<Modal
  header={<Header />}
  onHide={() => setIsOpen(false)}
  size="large"
  visible={isOpen}
>
  <p style={{ lineHeight: 1.6 }}>Lorem ipsum ...</p>
</Modal>'
        />
      </Section>
    </Page>
  );
};
