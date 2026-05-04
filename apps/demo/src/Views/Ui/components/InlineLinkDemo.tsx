import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, InlineLink, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const data = [
  {
    description: "Additional CSS classes to apply to the component.",
    id: 1,
    prop: "className",
    type: "string",
  },
  {
    description:
      "Determines whether the link is an external link or an internal link. Defaults to false.",
    id: 2,
    prop: "external",
    type: "boolean",
  },
  {
    description: "Content to display inside the link component.",
    id: 3,
    prop: "label",
    type: "ReactNode",
  },
  {
    description:
      "Specifies where to open the linked document. Only meant for external links.",
    id: 4,
    prop: "target",
    type: "HTMLAnchorElement['target']",
  },
  {
    description: "Specifies the link's destination.",
    id: 5,
    prop: "to",
    type: "string",
  },
  {
    description: "If true, the link must be underlined by default.",
    id: 6,
    prop: "underlined",
    type: "boolean",
  },
];

export const InlineLinkDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("inlineLink.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Inline link" })}</p>
        <CodeBlock exampleCode="import { InlineLink } from '@prefabs.tech/react-ui';" />
      </Section>
      <Section>
        <div className="links">
          <InlineLink label={t("inlineLink.label")} to="/ui" underlined />
          <InlineLink label={t("inlineLink.label")} to="/ui" />
        </div>
        <CodeBlock
          exampleCode="<div className='inline-link'>
  <InlineLink label={t('inlineLink.label')} to='/ui' underlined/>
  <InlineLink label={t('inlineLink.label')} to='/ui'/>
</div>"
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "Properties",
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
              accessorKey: "description",
              header: "Description",
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
