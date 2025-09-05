import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Modal, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const Header = () => {
  return <h2>Header functional component</h2>;
};

export const ModalDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "className",
      type: "string",
      default: "-",
      description: t("modal.propertiesDescription.className"),
    },
    {
      id: 2,
      prop: "children",
      type: "ReactNode",
      default: "-",
      description: t("modal.propertiesDescription.children"),
    },
    {
      id: 3,
      prop: "footer",
      type: "ReactNode",
      default: "-",
      description: t("modal.propertiesDescription.footer"),
    },
    {
      id: 4,
      prop: "header",
      type: "ReactNode",
      default: "-",
      description: t("modal.propertiesDescription.header"),
    },
    {
      id: 5,
      prop: "onHide",
      type: "() => void",
      default: "-",
      description: t("modal.propertiesDescription.onHide"),
    },
    {
      id: 6,
      prop: "size",
      type: `"auto" | "medium" | "large"`,
      default: `"medium"`,
      description: t("modal.propertiesDescription.size"),
    },
    {
      id: 7,
      prop: "visible",
      type: "Boolean",
      default: "false",
      description: t("modal.propertiesDescription.visible"),
    },
  ];

  const [headerFooterModal, setHeaderFooterModal] = useState<boolean>(false);
  const [isMediumModalOpen, setIsMediumModalOpen] = useState<boolean>(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState<boolean>(false);
  const [isAutoModalOpen, setIsAutoModalOpen] = useState<boolean>(false);

  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <Page
      className="demo-modal"
      title={t("modal.title")}
      subtitle={t("modal.subtitle")}
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

      <Section title={t("modal.usage.basic")}>
        <div className="container">
          <Button
            label="Medium"
            onClick={() => setIsMediumModalOpen(true)}
          ></Button>
          <Button
            label="Large"
            onClick={() => setIsLargeModalOpen(true)}
          ></Button>
          <Button
            label="Auto"
            onClick={() => setIsAutoModalOpen(true)}
          ></Button>
        </div>
        <Modal
          header="Header"
          onHide={() => setIsMediumModalOpen(false)}
          size="medium"
          visible={isMediumModalOpen}
        >
          <p style={{ lineHeight: 1.6 }}>{content}</p>
        </Modal>
        <Modal
          header="Header"
          onHide={() => setIsLargeModalOpen(false)}
          size="large"
          visible={isLargeModalOpen}
        >
          <p style={{ lineHeight: 1.6 }}>{content}</p>
        </Modal>
        <Modal
          header="Header"
          onHide={() => setIsAutoModalOpen(false)}
          size="auto"
          visible={isAutoModalOpen}
        >
          <p style={{ lineHeight: 1.6 }}>{content}</p>
        </Modal>
        <CodeBlock
          exampleCode='const [isAutoModalOpen, setIsAutoModalOpen] = useState<boolean>(false);
const [isMediumModalOpen, setIsMediumModalOpen] = useState<boolean>(false);
const [isLargeModalOpen, setIsLargeModalOpen] = useState<boolean>(false);

<Button label="Auto" onClick={() => setIsAutoModalOpen(true)}></Button>
<Modal
  header="Header"
  onHide={() => setIsAutoModalOpen(false)}
  size="auto"
  visible={isAutoModalOpen}
>
  <p style={{ lineHeight: 1.6 }}>{content}</p>
</Modal>

<Button label="Medium" onClick={() => setIsMediumModalOpen(true)}></Button>
<Modal
  header="Header"
  onHide={() => setIsMediumModalOpen(false)}
  size="medium"
  visible={isMediumModalOpen}
>
  <p style={{ lineHeight: 1.6 }}>{content}</p>
</Modal>

<Button label="Large" onClick={() => setIsLargeModalOpen(true)}></Button>
<Modal
  header="Header"
  onHide={() => setIsLargeModalOpen(false)}
  size="large"
  visible={isLargeModalOpen}
>
  <p style={{ lineHeight: 1.6 }}>{content}</p>
</Modal>'
        />
      </Section>

      <Section title={t("modal.usage.headerAndFooter")}>
        <div className="container">
          <Button
            label="Open modal"
            onClick={() => setHeaderFooterModal(true)}
          ></Button>
        </div>
        <Modal
          header={<Header />}
          onHide={() => setHeaderFooterModal(false)}
          visible={headerFooterModal}
          footer={
            <div>
              <Button label="Click me" />
            </div>
          }
        >
          <p style={{ lineHeight: 1.6 }}>{content}</p>
        </Modal>
        <CodeBlock
          exampleCode='const Header = () => {
  return <h2>Header functional component</h2>;
};

const [headerFooterModal, setHeaderFooterModal] = useState<boolean>(false);

<Button label="Open modal" onClick={() => setHeaderFooterModal(true)}></Button>
<Modal
  header={<Header />}
  onHide={() => setHeaderFooterModal(false)}
  visible={headerFooterModal}
  footer={
    <div>
      <Button label="Click me" />
    </div>
  }
>
  <p style={{ lineHeight: 1.6 }}>{content}</p>
</Modal>'
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "ModalProperties",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: t("propertiesTable.header.properties"),
            },
            {
              accessorKey: "type",
              header: t("propertiesTable.header.type"),
            },
            {
              accessorKey: "default",
              header: t("propertiesTable.header.default"),
            },
            {
              accessorKey: "description",
              header: t("propertiesTable.header.description"),
            },
          ]}
          data={data}
          paginated={false}
          persistState={false}
        />
      </Section>
    </Page>
  );
};
