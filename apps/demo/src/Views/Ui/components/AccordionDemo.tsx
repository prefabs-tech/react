import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  Accordion,
  Button,
  Page,
  SubPane,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const data = [
  {
    content:
      "An accordion is a UI component that organizes content into collapsible sections, allowing users to expand only the information they need.",
    title: "What is an accordion?",
  },
  {
    content:
      "Accordions help reduce clutter by hiding content until a section is opened. This improves readability and keeps interfaces clean.",
    title: "Why use an accordion?",
  },
  {
    content:
      "Clicking the header of an accordion section toggles its visibility. Only one section may remain open in some designs, while others allow multiple.",
    title: "How does an accordion work?",
  },
  {
    content:
      "Accordions are great for FAQs, settings panels, educational content, documentation, and any content that should stay organized.",
    title: "Where is an accordion used?",
  },
];

const accordionItems = [
  {
    content:
      "This section provides a general introduction and purpose of the accordion component.",
    icon: "pi pi-home",
    title: "Overview",
  },
  {
    content:
      "The accordion supports custom icons, smooth transitions, and flexible layouts.",
    icon: "pi pi-list",
    title: "Features",
  },
  {
    content:
      "Learn how to configure and customize the accordion to suit your application needs.",
    icon: <i className="pi pi-cog"></i>,
    title: "Settings",
  },
  {
    content:
      "Answers to common questions related to configuration, events, and customization.",
    icon: <i className="pi pi-question-circle"></i>,
    title: "FAQ",
  },
];

export const AccordionDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const propertiesData = [
    {
      id: 1,
      prop: "activeIcon",
      type: "string | ReactNode",
      default: "-",
      description: t("accordion.propertiesDescription.activeIcon"),
    },
    {
      id: 2,
      prop: "canSelfCollapse",
      type: "boolean",
      default: "false",
      description: t("accordion.propertiesDescription.canSelfCollapse"),
    },
    {
      id: 3,
      prop: "children",
      type: "ReactElement | ReactElement[]",
      default: "-",
      description: t("accordion.propertiesDescription.children"),
    },
    {
      id: 4,
      prop: "className",
      type: "string",
      default: "-",
      description: t("accordion.propertiesDescription.className"),
    },
    {
      id: 5,
      prop: "defaultActiveIndex",
      type: "number",
      default: "-",
      description: t("accordion.propertiesDescription.defaultActiveIndex"),
    },
    {
      id: 6,
      prop: "direction",
      type: `"horizontal" | "vertical"`,
      default: `"vertical"`,
      description: t("accordion.propertiesDescription.direction"),
    },
    {
      id: 7,
      prop: "inactiveIcon",
      type: "string | ReactNode",
      default: "-",
      description: t("accordion.propertiesDescription.inactiveIcon"),
    },
  ];

  return (
    <Page
      subtitle={t("accordion.subtitle")}
      title={t("accordion.title")}
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
        <p>{t("common.usage", { component: "Accordion" })}</p>
        <CodeBlock exampleCode='import { Accordion } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("accordion.usage.basic")}>
        <Accordion canSelfCollapse className="separate" defaultActiveIndex={0}>
          {data.map((item, index) => {
            return (
              <SubPane key={`accordion-basic-${index}`} title={item.title}>
                {item.content}
              </SubPane>
            );
          })}
        </Accordion>

        <CodeBlock
          exampleCode='
import { Accordion, SubPane } from "@prefabs.tech/react-ui";

<Accordion canSelfCollapse className="separate" defaultActiveIndex={0}>
  {data.map((item, index) => {
    return <SubPane key={index} title={item.title}>{item.content}</SubPane>;
  })}
</Accordion>
          '
        />
      </Section>

      <Section title={t("accordion.usage.icons")}>
        <Accordion
          activeIcon="pi pi-chevron-up"
          canSelfCollapse
          defaultActiveIndex={0}
          inactiveIcon="pi pi-chevron-down"
        >
          {accordionItems.map((item, index) => {
            return (
              <SubPane
                key={`accordion-icon-${index}`}
                icon={item.icon}
                title={item.title}
              >
                {item.content}
              </SubPane>
            );
          })}
        </Accordion>

        <CodeBlock
          exampleCode='
import { Accordion, SubPane } from "@prefabs.tech/react-ui";

<Accordion
  activeIcon="pi pi-chevron-up"
  canSelfCollapse
  defaultActiveIndex={0}
  inactiveIcon="pi pi-chevron-down"
>
  {accordionItems.map((item, index) => {
    return (
      <SubPane key={index} icon={item.icon} title={item.title}>
        {item.content}
      </SubPane>
    );
  })}
</Accordion>
          '
        />
      </Section>

      <Section title={t("accordion.usage.vertical")}>
        <Accordion direction="horizontal" defaultActiveIndex={0}>
          {data.map((item, index) => {
            return (
              <SubPane key={`accordion-vertical-${index}`} title={item.title}>
                {item.content}
              </SubPane>
            );
          })}
        </Accordion>

        <CodeBlock
          exampleCode='
import { Accordion, SubPane } from "@prefabs.tech/react-ui";

<Accordion direction="horizontal" defaultActiveIndex={0}>
  {data.map((item, index) => {
    return <SubPane key={index} title={item.title}>{item.content}</SubPane>;
  })}
</Accordion>
          '
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "AccordionProperties",
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
          persistState={false}
        />
      </Section>
    </Page>
  );
};
