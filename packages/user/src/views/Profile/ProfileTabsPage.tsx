import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page, TabView } from "@prefabs.tech/react-ui";
import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AccountInfo, ChangePassword, ProfileForm } from "@/components/Profile";
import { useUser } from "@/hooks";
import { UpdateProfileResponse } from "@/types";

import type { Tab } from "@prefabs.tech/react-ui";

interface Properties {
  activeKey?: string;
  additionalProfileFields?: AdditionalFormFields;
  tabs?: Tab[];
  visibleTabs?: string[];
  onProfileCancel?: () => void;
  onProfileSubmitted?: (response: UpdateProfileResponse) => void;
}

export const ProfileTabsPage = ({
  activeKey = "profile",
  additionalProfileFields,
  tabs = [],
  visibleTabs,
  onProfileCancel,
  onProfileSubmitted,
}: Properties) => {
  const { t } = useTranslation("user");
  const location = useLocation();
  const { user } = useUser();

  const defaultTabs = [
    {
      children: (
        <ProfileForm
          additionalProfileFields={additionalProfileFields}
          onCancel={onProfileCancel}
          onSubmitted={onProfileSubmitted}
        />
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

  if (user?.isProfileCompleted) {
    if (location.search?.startsWith("?redirect=")) {
      const searchParameters = new URLSearchParams(location.search);
      const redirectTo = searchParameters.get("redirect");

      if (redirectTo && redirectTo.length) {
        return <Navigate to={redirectTo} />;
      }
    }
  }

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
