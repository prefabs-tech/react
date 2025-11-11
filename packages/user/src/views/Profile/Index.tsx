import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page, TabView } from "@prefabs.tech/react-ui";
import React from "react";

import { AccountInfo, ProfileForm } from "@/components/Profile";

import { ChangePasswordTab } from "./ChangePasswordTab";

import type { Tab } from "@prefabs.tech/react-ui";

type DefaultTabs = Record<"profile" | "credentials", Omit<Tab, "key">>;

interface Properties {
  defaultTabsProperties?: DefaultTabs;
  activeKey?: string;
  additionalProfileFields?: AdditionalFormFields;
  additionalTabs?: Tab[];
  centered?: boolean;
  visibleTabs?: string[];
}

export const Profile = ({
  activeKey = "profile",
  additionalProfileFields,
  additionalTabs,
  defaultTabsProperties,
  visibleTabs,
}: Properties) => {
  const { t } = useTranslation("user");

  const tabList = [
    {
      children: defaultTabsProperties?.profile?.children ?? (
        <ProfileForm additionalProfileFields={additionalProfileFields} />
      ),
      closable: defaultTabsProperties?.profile?.closable ?? false,
      icon: defaultTabsProperties?.profile?.icon ?? undefined,
      key: "profile",
      label: defaultTabsProperties?.profile?.label ?? t("profile.tabs.profile"),
    },
    {
      children: defaultTabsProperties?.credentials?.children ?? (
        <>
          <section>
            <h2>{t("profile.accountInfo.title")}</h2>
            <AccountInfo />
          </section>

          <section>
            <h2>{t("changePassword.title")}</h2>
            <ChangePasswordTab />
          </section>
        </>
      ),
      closable: defaultTabsProperties?.credentials?.closable ?? false,
      icon: defaultTabsProperties?.credentials?.icon ?? undefined,
      key: "credentials",
      label:
        defaultTabsProperties?.credentials?.label ??
        t("profile.tabs.credentials"),
    },
    ...(additionalTabs ?? []),
  ] as Tab[];

  return (
    <Page title={t("profile.title")} className="profile">
      <TabView
        id="profile-tabs"
        activeKey={activeKey}
        enableHashRouting={true}
        tabs={tabList}
        visibleTabs={visibleTabs}
      />
    </Page>
  );
};
