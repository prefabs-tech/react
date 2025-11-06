import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";
import React from "react";

import { AccountInfo, ProfileForm } from "@/components/Profile";

interface Properties {
  additionalProfileFields?: AdditionalFormFields;
  centered?: boolean;
}

export const Profile = ({ additionalProfileFields }: Properties) => {
  const { t } = useTranslation("user");

  return (
    <Page title={t("profile.title")} className="profile">
      <AccountInfo />
      <ProfileForm additionalProfileFields={additionalProfileFields} />
    </Page>
  );
};
