import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, DropdownMenu, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

import type { MenuItem } from "@prefabs.tech/react-ui";

export const DropdownMenuDemo = () => {
  const [t] = useTranslation(["ui", "user"]);
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: "pi pi-lock",
      label: t("user:changePassword.title"),
      className: "change-password",
      display: true,
      disabled: true,
    },
    {
      icon: "pi pi-user",
      label: t("user:userMenu.profile"),
    },
  ];

  const severityMenuItems: MenuItem[] = [
    {
      icon: "pi pi-eye",
      label: t("ui:dropdownMenu.label.view"),
      severity: "primary",
    },
    {
      icon: "pi pi-pencil",
      label: t("ui:dropdownMenu.label.edit"),
      severity: "warning",
    },
    {
      icon: "pi pi-trash",
      label: t("ui:dropdownMenu.label.delete"),
      severity: "danger",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const template = (item: any) => {
    return (
      <>
        <i className={item.icon} style={{ marginRight: "0.5rem" }}></i>
        <span>{item.label}</span>
      </>
    );
  };

  const propertiesData = [
    {
      default: '""',
      description: t("ui:dropdownMenu.propertiesDescription.className"),
      id: 1,
      prop: "className",
      type: "string",
    },
    {
      default: "-",
      description: t("ui:dropdownMenu.propertiesDescription.close"),
      id: 2,
      prop: "close",
      type: "() => void",
    },
    {
      default: "false",
      description: t("ui:dropdownMenu.propertiesDescription.hideDropdownIcon"),
      id: 3,
      prop: "hideDropdownIcon",
      type: "boolean",
    },
    {
      default: "false",
      description: t("ui:dropdownMenu.propertiesDescription.isControlled"),
      id: 4,
      prop: "isControlled",
      type: "boolean",
    },
    {
      default: "false",
      description: t("ui:dropdownMenu.propertiesDescription.isOpen"),
      id: 5,
      prop: "isOpen",
      type: "boolean",
    },
    {
      default: "-",
      description: t("ui:dropdownMenu.propertiesDescription.label"),
      id: 6,
      prop: "label",
      type: "React.ReactNode",
    },
    {
      default: "[]",
      description: t("ui:dropdownMenu.propertiesDescription.menu"),
      id: 7,
      prop: "menu",
      type: "MenuItem[]",
    },
    {
      default: "0",
      description: t("ui:dropdownMenu.propertiesDescription.offset"),
      id: 8,
      prop: "offset",
      type: "number",
    },
    {
      default: '"bottom-start"',
      description: t("ui:dropdownMenu.propertiesDescription.position"),
      id: 9,
      prop: "position",
      type: "string",
    },
    {
      default: "-",
      description: t("ui:dropdownMenu.propertiesDescription.renderOption"),
      id: 10,
      prop: "renderOption",
      type: "(item: MenuItem) => React.ReactNode",
    },
    {
      default: "-",
      description: t("ui:dropdownMenu.propertiesDescription.toggle"),
      id: 11,
      prop: "toggle",
      type: "() => void",
    },
    {
      default: "Ellipsis Icon",
      description: t("ui:dropdownMenu.propertiesDescription.trigger"),
      id: 12,
      prop: "trigger",
      type: "React.ReactNode",
    },
  ];

  return (
    <Page
      subtitle={t("dropdownMenu.subtitle")}
      title={t("dropdownMenu.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("dropdownMenu.usage.leftAlign")}>
        <DropdownMenu
          label={t("dropdownMenu.label.setting")}
          position="left-start"
          menu={menuItems}
        />
        <CodeBlock
          exampleCode='<DropdownMenu
  label="Settings"
  position="left-start"
  menu={menuItems}
/>'
        />
      </Section>
      <Section title={t("dropdownMenu.usage.templating")}>
        <DropdownMenu
          label={t("dropdownMenu.label.user")}
          menu={menuItems}
          renderOption={template}
        />

        <CodeBlock
          exampleCode='<DropdownMenu
  label="User"
  menu={menuItems}
  renderOption={template}
/>'
        />
      </Section>
      <Section title={t("dropdownMenu.usage.severity")}>
        <DropdownMenu
          menu={severityMenuItems}
          trigger={
            <div className="dropdown-menu-trigger">
              <i className="pi pi-cog"></i>
            </div>
          }
        />
        <CodeBlock
          exampleCode='const severityMenuItems: MenuItem[] = [
  {
    icon: "pi pi-eye",
    label: t("ui:dropdownMenu.label.view"),
    severity: "primary",
  },
  {
    icon: "pi pi-pencil",
    label: t("ui:dropdownMenu.label.edit"),
    severity: "warning",
  },
  {
    icon: "pi pi-trash",
    label: t("ui:dropdownMenu.label.delete"),
    severity: "danger",
  },
];
    
return (<DropdownMenu
  menu={severityMenuItems}
  trigger={
    <div className="dropdown-menu-trigger">
      <i className="pi pi-cog"></i>
    </div>
  }
/>);'
        />
      </Section>
      <Section title={t("dropdownMenu.usage.hiddenDropdownIcon")}>
        <DropdownMenu menu={menuItems} hideDropdownIcon />
        <CodeBlock exampleCode="<DropdownMenu menu={menuItems} hideDropdownIcon />" />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "DropdownMenu",
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
          data={propertiesData}
          paginated={false}
          persistState={false}
        />
      </Section>
    </Page>
  );
};
