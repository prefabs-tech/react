import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Tag, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const PageDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const propertiesData = [
    {
      default: "-",
      description: t("page.propertiesDescription.breadcrumb"),
      prop: "breadcrumb",
      type: "React.ReactNode",
    },
    {
      default: "false",
      description: t("page.propertiesDescription.centered"),
      prop: "centered",
      type: "boolean",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.children"),
      prop: "children",
      type: "React.ReactNode",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.className"),
      prop: "className",
      type: "string",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.errorMessage"),
      prop: "errorMessage",
      type: "string",
    },
    {
      default: "false",
      description: t("page.propertiesDescription.loading"),
      prop: "loading",
      type: "boolean",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.loadingComponent"),
      prop: "loadingComponent",
      type: "React.ReactElement",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.loadingPageStyle"),
      prop: "loadingPageStyle",
      type: "LoadingPageProperties",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.subtitle"),
      prop: "subtitle",
      type: "string | React.ReactNode",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.title"),
      prop: "title",
      type: "string | React.ReactNode",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.titleTag"),
      prop: "titleTag",
      type: "string | React.ReactNode",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.toolbarActionMenu"),
      prop: "toolbarActionMenu",
      type: "ToolbarActionsMenuProperties",
    },
    {
      default: "-",
      description: t("page.propertiesDescription.toolbar"),
      prop: "toolbar",
      type: "React.ReactNode",
    },
  ];

  const pageContent = <div style={{ height: "20vh" }}>Page content.</div>;

  const breadcrumb = (
    <Button
      iconLeft={<i className="pi pi-chevron-left"></i>}
      variant="textOnly"
      label={t("page.breadcrumb.back")}
    />
  );

  return (
    <>
      <Page
        title={t("page.title")}
        subtitle={t("page.subtitle")}
        toolbar={
          <Button
            label={t("buttons.back")}
            variant="textOnly"
            iconLeft={<i className="pi pi-chevron-left"></i>}
            onClick={() => navigate("..")}
          />
        }
      ></Page>
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Page" })}</p>
        <CodeBlock exampleCode='import { Page } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("page.usage.basic")}>
        <Page
          title={"Basic page title"}
          toolbarActionMenu={{
            actions: [
              {
                iconLeft: "pi pi-chevron-left",
                variant: "textOnly",
                label: "Back",
              },
            ],
          }}
          children={pageContent}
        />
        <CodeBlock
          exampleCode='const pageContent = <div style={{ height: "20vh" }}>Page content.</div>;

<Page
  title={"Basic page title"}
  toolbarActionMenu={{
    actions: [
      {
        iconLeft: "pi pi-chevron-left",
        variant: "outlined",
        label: "Back",
      },
    ],
  }}
  children={pageContent}
/>'
        />
      </Section>

      <Section title={t("page.usage.toolbar")}>
        <Page
          title={"Page title"}
          children={pageContent}
          breadcrumb={breadcrumb}
          toolbarActionMenu={{
            actions: [
              {
                iconLeft: <i className="pi pi-chevron-left"></i>,
                variant: "textOnly",
                label: "Back",
              },
              {
                label: "Click",
                severity: "secondary",
              },
              {
                label: "Delete",
                className: "danger",
              },
            ],
          }}
        />
        <CodeBlock
          exampleCode='const pageContent = <div style={{ height: "20vh" }}>Page content.</div>;

<Page
  title={"Page title"}
  children={pageContent}
  breadcrumb={breadcrumb}
  toolbarActionMenu={{
    actions: [
      {
        iconLeft: <i className="pi pi-chevron-left"></i>,
        variant: "textOnly",
        label: "Back",
      },
      {
        label: "Click",
        severity: "secondary",
      },
      {
        label: "Delete",
        className: "danger",
      },
    ],
  }}
/>'
        />
      </Section>

      <Section title={t("page.usage.complete")}>
        <Page
          title={"Page header title"}
          titleTag={<Tag label={"Heading tag"} />}
          subtitle={<Tag label={"Subtitle tag"} />}
          children={pageContent}
          toolbarActionMenu={{
            actions: [
              {
                iconLeft: <i className="pi pi-chevron-left"></i>,
                variant: "textOnly",
                label: "Back",
              },
              {
                label: "Edit",
                severity: "secondary",
              },
              {
                label: "Delete",
                className: "danger",
              },
            ],
          }}
        />

        <CodeBlock
          exampleCode='const pageContent = <div style={{ height: "20vh" }}>Page content.</div>;

<Page
  title={"Page header title"}
  titleTag={<Tag label={"Heading tag"} />}
  subtitle={<Tag label={"Subtitle tag"} />}
  children={pageContent}
  toolbarActionMenu={{
    actions: [
      {
        iconLeft: <i className="pi pi-chevron-left"></i>,
        variant: "textOnly",
        label: "Back",
      },
      {
        label: "Edit",
        severity: "secondary",
      },
      {
        label: "Delete",
        className: "danger",
      },
    ],
  }}
/>'
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "PageProperties",
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
    </>
  );
};
