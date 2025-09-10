import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, DropdownMenu, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

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
      label: t("ui:dropdownMenu.label.view"),
      severity: "primary",
    },
    {
      label: t("ui:dropdownMenu.label.edit"),
      severity: "warning",
    },
    {
      label: t("ui:dropdownMenu.label.delete"),
      severity: "danger",
    },
  ];

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
          position="top-start"
          menu={menuItems}
        />
      </Section>
      <Section title={t("dropdownMenu.usage.templating")}>
        <DropdownMenu
          label={t("dropdownMenu.label.user")}
          menu={menuItems}
          renderOption={template}
        />
      </Section>
      <Section title={t("dropdownMenu.usage.severity")}>
        <DropdownMenu
          menu={severityMenuItems}
          trigger={<i className="pi pi-cog"></i>}
        />
      </Section>
      <Section title={t("dropdownMenu.usage.hiddenDropdownIcon")}>
        <DropdownMenu menu={menuItems} hideDropdownIcon />
      </Section>
    </Page>
  );
};
