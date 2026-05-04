import type { MenuItem } from "@prefabs.tech/react-ui";

import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, DropdownMenu, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const DropdownMenuDemo = () => {
  const [t] = useTranslation(["ui", "user"]);
  const navigate = useNavigate();

  const menuItems = [
    {
      className: "change-password",
      disabled: true,
      display: true,
      icon: "pi pi-lock",
      label: t("user:changePassword.title"),
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

  return (
    <Page
      subtitle={t("dropdownMenu.subtitle")}
      title={t("dropdownMenu.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section title={t("dropdownMenu.usage.leftAlign")}>
        <DropdownMenu
          label={t("dropdownMenu.label.setting")}
          menu={menuItems}
          position="left-start"
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
        <DropdownMenu hideDropdownIcon menu={menuItems} />
        <CodeBlock exampleCode="<DropdownMenu menu={menuItems} hideDropdownIcon />" />
      </Section>
    </Page>
  );
};
