import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Modal, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const Header = () => {
  return <h2>Header as functional component</h2>;
};

const data = [
  {
    id: 1,
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes to apply to the modal.",
  },
  {
    id: 2,
    prop: "children",
    type: "ReactNode",
    default: "-",
    description: "The content of the modal.",
  },
  {
    id: 3,
    prop: "footer",
    type: "ReactNode",
    default: "-",
    description: "Footer section of the modal. Placed below the content.",
  },
  {
    id: 4,
    prop: "header",
    type: "ReactNode",
    default: "-",
    description: "Footer section of the modal.",
  },
  {
    id: 5,
    prop: "onHide",
    type: "() => void",
    default: "-",
    description: "Emitted when the modal is requested to close.",
  },
  {
    id: 6,
    prop: "size",
    type: "medium | large",
    default: "medium",
    description: "Defines the width of the modal.",
  },
  {
    id: 7,
    prop: "visible",
    type: "Boolean",
    default: "false",
    description: "Controls the visibility of the modal.",
  },
];

export const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);
  const [isOpen4, setIsOpen4] = useState<boolean>(false);
  const [isOpen5, setIsOpen5] = useState<boolean>(false);

  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <Page
      title={t("modal.title")}
      subtitle={t("modal.subTitle")}
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
          header="Header content"
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
  header="Header content"
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
          exampleCode='const Header = () => {
  return <h2>Header as functional component</h2>;
};

const [isOpen, setIsOpen] = useState<boolean>(false);

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

      <Section title={t("modal.usage.footer")}>
        <Button label="Open modal" onClick={() => setIsOpen5(true)}></Button>
        <Modal
          onHide={() => setIsOpen5(false)}
          visible={isOpen5}
          footer="footer content"
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
  footer="footer content"
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
      <Section
        title={t("headers.propertiesValue", {
          value: "ModalProperties",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "default",
              header: "Default",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={data}
          paginated={false}
        />
      </Section>
    </Page>
  );
};
