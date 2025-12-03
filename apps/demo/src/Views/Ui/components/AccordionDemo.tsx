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

<Accordion canSelfCollapse defaultActiveIndex={0}>
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
