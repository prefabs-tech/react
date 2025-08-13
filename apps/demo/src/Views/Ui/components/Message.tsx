import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Message, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const MessageDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const propertiesData = [
    {
      default: "true",
      description: t("message.propertiesDescription.enableClose"),
      prop: "enableClose",
      type: "boolean",
    },
    {
      default: "-",
      description: t("message.propertiesDescription.icon"),
      prop: "icon",
      type: "string | ReactNode",
    },
    {
      default: "-",
      description: t("message.propertiesDescription.message"),
      prop: "message",
      type: "string | string[] | ReactNode",
    },
    {
      default: "-",
      description: t("message.propertiesDescription.onClose"),
      prop: "onClose",
      type: "() => void",
    },
    {
      default: "info",
      description: t("message.propertiesDescription.severity"),
      prop: "severity",
      type: `"info" | "success" | "warning" | "danger" | "tip"`,
    },
    {
      default: "true",
      description: t("message.propertiesDescription.showIcon"),
      prop: "showIcon",
      type: "boolean",
    },
  ];

  return (
    <Page
      title={t("message.title")}
      subtitle={t("message.subtitle")}
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
        <p>{t("common.usage", { component: "Message" })}</p>
        <CodeBlock exampleCode='import { Message } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("message.usage.basic")}>
        <Message message="Info message" severity="info" />
        <Message message="Success message" severity="success" />
        <Message message="Warning message" severity="warning" />
        <Message message="Danger message" severity="danger" />
        <Message message="Tip message" severity="tip" />
        <CodeBlock
          exampleCode='<Message message="Info message" severity="info" />
<Message message="Success message" severity="success" />
<Message message="Warning message" severity="warning" />
<Message message="Danger message" severity="danger" />
<Message message="Tip message" severity="tip" />'
        />
      </Section>

      <Section title={t("message.usage.disableClose")}>
        <Message
          enableClose={false}
          icon={<i className="pi pi-bell" />}
          message="We value your feedback: take our quick survey!"
        />
        <CodeBlock
          exampleCode='<Message 
  message="We value your feedback: take our quick survey!"
  icon={<i className="pi pi-bell" />}
  enableClose={false}
/>'
        />
      </Section>

      <Section title={t("message.usage.arrayMessage")}>
        <Message
          message={[
            "Season Sale: Enjoy massive discounts with up to 50% off on a wide range of selected items — from fashion to electronics, don’t miss out on these limited-time offers!",
            "New features just launched! Check them out!",
            "New Year, New You: Start fresh with our services!",
          ]}
        />
        <CodeBlock
          exampleCode="<Message
  message={
    [
      'Season Sale: Enjoy massive discounts with up to 50% off on a wide range of selected items — from fashion to electronics, don’t miss out on these limited-time offers!',
      'New features just launched! Check them out!',
      'New Year, New You: Start fresh with our services!'
    ]}
/>"
        />
      </Section>

      <Section title={t("message.usage.customMessage")}>
        <Message message={<b>Season sale: Up to 50% off selected items!</b>} />
        <CodeBlock exampleCode="<Message message={<b>Season sale: Up to 50% off selected items!</b>} />" />
      </Section>

      <Section title={t("message.usage.icons.icon")}>
        <Message
          message="New features just launched! Check them out!"
          icon="pi pi-android"
        />
        <CodeBlock
          exampleCode='<Message 
  message="New features just launched! Check them out!"
  icon="pi pi-android"
/>'
        />
      </Section>

      <Section title={t("message.usage.icons.customIcon")}>
        <Message
          message="New Year, New You: Start fresh with our services!"
          icon={<i className="pi pi-bell" />}
        />
        <CodeBlock
          exampleCode='<Message 
  message="New Year, New You: Start fresh with our services!"
  icon={<i className="pi pi-bell" />}
/>'
        />
      </Section>

      <Section title={t("message.usage.hideIcon")}>
        <Message
          message="Season sale: Up to 50% off selected items!"
          showIcon={false}
        />
        <CodeBlock exampleCode='<Message message="Season sale: Up to 50% off selected items!" showIcon={false} />' />
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "MessageProperties",
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
          data={propertiesData}
          paginated={false}
        />
      </Section>
    </Page>
  );
};
