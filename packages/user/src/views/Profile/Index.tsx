import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page, TabView } from "@prefabs.tech/react-ui";
import React, { useMemo } from "react";

import { AccountInfo, ChangePassword, ProfileForm } from "@/components/Profile";

import type { Tab } from "@prefabs.tech/react-ui";

interface Properties {
  activeKey?: string;
  additionalProfileFields?: AdditionalFormFields;
  tabs?: Tab[];
  visibleTabs?: string[];
}

export const Profile = ({
  activeKey = "profile",
  additionalProfileFields,
  tabs = [],
  visibleTabs,
}: Properties) => {
  const { t } = useTranslation("user");

  const defaultTabs = [
    {
      children: (
        <ProfileForm additionalProfileFields={additionalProfileFields} />
      ),
      key: "profile",
      label: t("profile.tabs.profile"),
    },
    {
      children: (
        <>
          <section>
            <h2>{t("profile.accountInfo.title")}</h2>
            <AccountInfo />
          </section>

          <section>
            <h2>{t("changePassword.title")}</h2>
            <ChangePassword />
          </section>
        </>
      ),
      key: "credentials",
      label: t("profile.tabs.credentials"),
    },
  ] as Tab[];

  const mergedTabs = useMemo(
    () => [
      ...defaultTabs.map((defaultTab) => {
        const override = tabs.find((tab) => tab.key === defaultTab.key);
        return override ? { ...defaultTab, ...override } : defaultTab;
      }),
      ...tabs.filter(
        (tab) => !defaultTabs.some((defaultTab) => defaultTab.key === tab.key),
      ),
    ],
    [defaultTabs, tabs],
  );

  return (
    <Page title={t("profile.title")} className="profile">
      <TabView
        id="profile-tabs"
        activeKey={activeKey}
        enableHashRouting={true}
        tabs={mergedTabs}
        visibleTabs={visibleTabs}
      />
    </Page>
  );
};
