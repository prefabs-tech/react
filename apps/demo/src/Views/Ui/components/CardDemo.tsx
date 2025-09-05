import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Page,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const data = [
  {
    id: 1,
    prop: " className",
    type: "string",
    default: "-",
    description: "Additional CSS classes to apply to the card.",
  },
  {
    id: 2,
    prop: "children",
    type: "ReactNode",
    default: "-",
    description:
      "The content of the card. Typically includes child components like `CardHeader`, `CardBody` and `CardFooter`.",
  },
  {
    id: 3,
    prop: "outlined",
    type: "boolean",
    default: "false",
    description:
      "Whether to render the card in an outlined style (e.g. with a border)",
  },
];

export const CardDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("card.title")}
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
        <p>{t("common.usage", { component: "Card" })}</p>
        <CodeBlock exampleCode="import { Card } from '@prefabs.tech/react-ui';" />
      </Section>

      <Section title={t("card.usage.basic")}>
        <Card>
          <CardHeader>
            <h3>{t("card.header")}</h3>
          </CardHeader>
          <CardBody>
            <p>{t("card.body")}</p>
          </CardBody>
          <CardFooter>
            <p>{t("card.footer")}</p>
          </CardFooter>
        </Card>

        <CodeBlock
          exampleCode='
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@prefabs.tech/react-ui";

<Card>
  <CardHeader>
    <h3>{t("card.header")}</h3>
  </CardHeader>
  <CardBody>
    <p>{t("card.body")}</p>
  </CardBody>
  <CardFooter>
    <p>{t("card.footer")}</p>
  </CardFooter>
</Card>'
        />
      </Section>
      <Section title={t("card.usage.outlined")}>
        <Card outlined>
          <CardHeader>
            <h3>{t("card.header")}</h3>
          </CardHeader>
          <CardBody>
            <p>{t("card.body")}</p>
          </CardBody>
          <CardFooter>
            <p>{t("card.footer")}</p>
          </CardFooter>
        </Card>

        <CodeBlock
          exampleCode='
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@prefabs.tech/react-ui";

<Card outlined>
  <CardHeader>
    <h3>{t("card.header")}</h3>
  </CardHeader>
  <CardBody>
    <p>{t("card.body")}</p>
  </CardBody>
  <CardFooter>
    <p>{t("card.footer")}</p>
  </CardFooter>
</Card>'
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "CardProperties",
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
          persistState={false}
        />
      </Section>
    </Page>
  );
};
