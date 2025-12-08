import { Provider, AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { updateUserProfile } from "@/api/user";
import { useConfig, useUser } from "@/hooks";
import { UpdateProfileInput, UpdateProfileResponse } from "@/types";

import { ProfileFormFields } from "./ProfileFormFields";

interface Properties {
  additionalProfileFields?: AdditionalFormFields;
  onCancel?: () => void;
  onSubmitted?: (response: UpdateProfileResponse) => void;
}

export const ProfileForm = ({
  additionalProfileFields,
  onCancel,
  onSubmitted,
}: Properties) => {
  const { t, i18n } = useTranslation("user");
  const { user, setUser } = useUser();
  const config = useConfig();
  const [submitting, setSubmitting] = useState(false);

  let profileValidationSchema: z.AnyZodObject = z.object({
    givenName: z
      .string()
      .min(1, t("profile.form.validations.firstName.required")),
    middleNames: z.string().optional(),
    surname: z.string().min(1, t("profile.form.validations.lastName.required")),
  });

  if (additionalProfileFields?.schema) {
    profileValidationSchema = profileValidationSchema.merge(
      additionalProfileFields.schema,
    );
  }

  const handleSubmit = async (data: UpdateProfileInput) => {
    setSubmitting(true);

    updateUserProfile(data, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response) {
          toast.success(t("profile.toastMessages.success"));

          if (onSubmitted) {
            onSubmitted(response);
          }

          setUser(response.data);
        } else {
          toast.error(t("profile.toastMessages.error"));
        }
      })
      .catch(() => {
        toast.error(t("profile.toastMessages.error"));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formValues = {
    email: user?.email || "",
    givenName: user?.givenName || "",
    surname: user?.surname || "",
    middleNames: user?.middleNames || "",
    ...additionalProfileFields?.defaultValues,
  };

  return (
    <Provider
      onSubmit={handleSubmit}
      validationSchema={profileValidationSchema}
      validationTriggerKey={i18n.language}
      values={formValues}
    >
      <ProfileFormFields
        submitting={submitting}
        additionalProfileFields={additionalProfileFields}
        onCancel={onCancel}
      />
    </Provider>
  );
};
