import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page, TabView } from "@prefabs.tech/react-ui";
import React from "react";

import { AccountInfo, ProfileForm } from "@/components/Profile";

import { ChangePasswordTab } from "./ChangePasswordTab";

interface Properties {
  additionalProfileFields?: AdditionalFormFields;
  centered?: boolean;
}

export const Profile = ({ additionalProfileFields }: Properties) => {
  const { t } = useTranslation("user");

  const tabList = [
    {
      key: "my-profile",
      label: t("profile.tabs.profile"),
      children: (
        <ProfileForm additionalProfileFields={additionalProfileFields} />
      ),
    },
    {
      key: "credentials",
      label: t("profile.tabs.credentials"),
      children: (
        <>
          <AccountInfo />
          <ChangePasswordTab />
        </>
      ),
    },
  ];

  return (
    <Page title={t("profile.title")} className="profile">
      <TabView id="profile-tabbed-pannel" tabs={tabList} />
    </Page>
  );
};
