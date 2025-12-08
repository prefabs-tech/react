import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AccountInfo, ProfileForm } from "@/components/Profile";
import { useUser } from "@/hooks";
import { UpdateProfileResponse } from "@/types";

interface Properties {
  additionalProfileFields?: AdditionalFormFields;
  centered?: boolean;
  onCancel?: () => void;
  onSubmitted?: (response: UpdateProfileResponse) => void;
}

export const ProfilePage = ({
  additionalProfileFields,
  onCancel,
  onSubmitted,
}: Properties) => {
  const { t } = useTranslation("user");

  const location = useLocation();
  const { user } = useUser();

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
      <AccountInfo />
      <ProfileForm
        additionalProfileFields={additionalProfileFields}
        onCancel={onCancel}
        onSubmitted={onSubmitted}
      />
    </Page>
  );
};
