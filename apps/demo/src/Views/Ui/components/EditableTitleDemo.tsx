import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  Button,
  Card,
  CardBody,
  EditableTitle,
  Page,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

const PROPERTIES_DATA = [
  {
    id: 1,
    prop: "allowEdit",
    type: "boolean",
    default: "true",
    description: "Enables or disables the editing functionality.",
  },
  {
    id: 2,
    prop: "onChange",
    type: "(event: ChangeEvent<HTMLInputElement>) => void",
    default: "undefined",
    description:
      "Callback function triggered when the title input changes i.e `onchange` event.",
  },
  {
    id: 3,
    prop: "handleUpdate",
    type: "(title: string) => void",
    default: "undefined",
    description:
      "Callback function triggered when the title is updated after leaving the input field i.e `onblur` event.",
  },
  {
    id: 4,
    prop: "placeholder",
    type: "string",
    default: "undefined",
    description: "Placeholder text for the input field when in edit mode.",
  },
  {
    id: 5,
    prop: "title",
    type: "string",
    default: "undefined",
    description: "The initial title to display.",
  },
  {
    id: 6,
    prop: "titleLevel",
    type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
    default: '"h1"',
    description: "Specifies the HTML heading level for the displayed title.",
  },
  {
    id: 7,
    prop: "toggler",
    type: "JSX.Element",
    default: "<Button />",
    description:
      "A custom toggle button element that activates edit mode. If not provided, a default button will be rendered.",
  },
  {
    id: 8,
    prop: "showToggler",
    type: "boolean",
    default: "true",
    description:
      "Display toggle button to toggle between editing and display mode. Otherwise, title itself will handle the functionality on `click event`",
  },
];

export const EditableTitleDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const handleTitleUpdate = (title: string) => {
    // eslint-disable-next-line no-console
    console.log("The updated title is:", title);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Page
      title={t("editableTitle.title")}
      subtitle={t("editableTitle.subtitle")}
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
        <p>{t("common.usage", { component: "EditableTitle" })}</p>
        <CodeBlock exampleCode="import { EditableTitle } from '@prefabs.tech/react-ui';" />
      </Section>

      <Section title={t("headers.properties")}>
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
          data={PROPERTIES_DATA}
          paginated={false}
        />
      </Section>

      <Section title={t("editableTitle.usage.basic.title")}>
        <p>{t("editableTitle.usage.basic.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              handleUpdate={handleTitleUpdate}
            />
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'}  titleLevel='h3' handleUpdate={handleTitleUpdate}/>" />
      </Section>

      <Section title={t("editableTitle.usage.controlled.title")}>
        <p>{t("editableTitle.usage.controlled.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              onChange={handleTitleChange}
            />
            {value ? <CodeBlock exampleCode={value} /> : null}
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' onChange={handleTitleChange}/>" />
      </Section>

      <Section title={t("editableTitle.usage.disabled.title")}>
        <p>{t("editableTitle.usage.disabled.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle title={"Hello"} titleLevel="h3" allowEdit={false} />
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' allowEdit={false} />" />
      </Section>

      <Section title={t("editableTitle.usage.customToggler.title")}>
        <p>{t("editableTitle.usage.customToggler.description")}</p>
        <Card className="editable-title" outlined>
          <CardBody>
            <EditableTitle
              title={"Hello"}
              titleLevel="h3"
              toggler={<i className="pi pi-pen-to-square"></i>}
            />
          </CardBody>
        </Card>
        <CodeBlock exampleCode="<EditableTitle title={'Hello'} titleLevel='h3' toggler={<i className='pi pi-pen-to-square'></i>} />" />
      </Section>
    </Page>
  );
};
