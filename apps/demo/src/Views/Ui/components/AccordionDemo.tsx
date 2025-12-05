import { useTranslation } from "@prefabs.tech/react-i18n";
import { Accordion, Button, Page, SubPane } from "@prefabs.tech/react-ui";
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

  return (
    <Page
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
      <Section title={t("accordion.usage.basic")}>
        <Accordion canSelfCollapse className="separate" defaultActiveIndex={0}>
          {data.map((item) => {
            return <SubPane title={item.title}>{item.content}</SubPane>;
          })}
        </Accordion>

        <CodeBlock
          exampleCode='
import { Accordion, SubPane } from "@prefabs.tech/react-ui";

<Accordion canSelfCollapse className="separate" defaultActiveIndex={0}>
  {data.map((item) => {
    return <SubPane title={item.title}>{item.content}</SubPane>;
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
          {accordionItems.map((item) => {
            return (
              <SubPane icon={item.icon} title={item.title}>
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
  {accordionItems.map((item) => {
    return (
      <SubPane icon={item.icon} title={item.title}>
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
          {data.map((item) => {
            return <SubPane title={item.title}>{item.content}</SubPane>;
          })}
        </Accordion>

        <CodeBlock
          exampleCode='
import { Accordion, SubPane } from "@prefabs.tech/react-ui";

<Accordion direction="horizontal" defaultActiveIndex={0}>
  {data.map((item) => {
    return <SubPane title={item.title}>{item.content}</SubPane>;
  })}
</Accordion>
          '
        />
      </Section>
    </Page>
  );
};
