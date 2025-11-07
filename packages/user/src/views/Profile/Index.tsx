import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page, TabView } from "@prefabs.tech/react-ui";
import React from "react";

import { AccountInfo, ProfileForm } from "@/components/Profile";

import { ChangePasswordTab } from "./ChangePasswordTab";

import type { Tab } from "@prefabs.tech/react-ui";

interface ProfileTabsProperty {
  label?: string;
  children?: React.ReactNode;
}

interface Properties {
  defaultTabsProperties?: Record<string, ProfileTabsProperty>;
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
      key: "profile",
      label: defaultTabsProperties?.profile?.label ?? t("profile.tabs.profile"),
      children: defaultTabsProperties?.profile?.children ?? (
        <ProfileForm additionalProfileFields={additionalProfileFields} />
      ),
    },
    {
      key: "credentials",
      label:
        defaultTabsProperties?.credentials?.label ??
        t("profile.tabs.credentials"),
      children: defaultTabsProperties?.credentials?.children ?? (
        <>
          <AccountInfo />
          <ChangePasswordTab />
        </>
      ),
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
