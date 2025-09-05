import { useTranslation } from "@prefabs.tech/react-i18n";
import { StickyCollapsibleFooter } from "@prefabs.tech/react-layout";
import {
  Button,
  Card,
  CardBody,
  Input,
  Page,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "children",
    type: "ReactNode",
    description:
      "The content to be displayed inside the sticky collapsible footer.",
  },
  {
    id: 2,
    prop: "fixed",
    type: "boolean",
    description:
      "If false, indicates that the sticky collapsible footer is positioned at the bottom of the parent container, otherwise fixed at the bottom of viewport. Defaults to 'true'.",
  },
];

export const StickyCollapsibleFooterDemo = () => {
  const [inputValue, setInputValue] = useState("");

  const [t] = useTranslation("layout");
  const navigate = useNavigate();

  return (
    <Page
      title={t("stickyCollapsibleFooter.title")}
      className="sticky-collapsible-footer"
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
        <p>{t("common.usage", { component: "Sticky collapsible footer" })}</p>
        <CodeBlock exampleCode="import { StickyCollapsibleFooter } from '@prefabs.tech/react-layout';" />
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

      <Section title={t("stickyCollapsibleFooter.usage.footerFixed")}>
        <p>{t("stickyCollapsibleFooter.subtitle.footerFixed")}</p>
        <CodeBlock
          exampleCode="<StickyCollapsibleFooter>
  <Input 
    placeholder='Input placeholder' 
    onChange={(event) => setInputValue(event.target.value)}
  />
  <Button
    label='Submit'
    size='small'
    onClick={() => alert(inputValue)}
  />
  <Button
    label='Cancel'
    size='small'
    severity='secondary'
    variant='outlined'
    onClick={() => alert('Cancelled!')}
  />  
</StickyCollapsibleFooter>"
        />
        <StickyCollapsibleFooter>
          <Input
            placeholder="Input placeholder"
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Button
            label="Submit"
            size="small"
            onClick={() => alert(inputValue)}
          />
          <Button
            label="Cancel"
            size="small"
            severity="secondary"
            variant="outlined"
            onClick={() => alert("Cancelled!")}
          />
        </StickyCollapsibleFooter>
      </Section>
      <Section title={t("stickyCollapsibleFooter.usage.footerAbsolute")}>
        <p>{t("stickyCollapsibleFooter.subtitle.footerAbsolute")}</p>
        <Card outlined>
          <CardBody>
            <div style={{ height: "20vh" }}>Body content</div>
          </CardBody>
          <StickyCollapsibleFooter fixed={false}>
            <p>This is a sticky footer content.</p>
          </StickyCollapsibleFooter>
        </Card>
        <CodeBlock
          exampleCode="<Card outlined>
  <CardBody>
    <div style={{ height: '20vh' }}>Body content</div>
  </CardBody>
  <StickyCollapsibleFooter fixed={false}>
    <p>This is a sticky footer content.</p>
  </StickyCollapsibleFooter>
</Card>"
        />
      </Section>
    </Page>
  );
};
