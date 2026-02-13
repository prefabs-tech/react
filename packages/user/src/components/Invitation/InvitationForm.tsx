import {
  Provider,
  emailSchema,
  AdditionalFormFields,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Message } from "@prefabs.tech/react-ui";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import * as zod from "zod";

import { addInvitation } from "@/api/invitation";
import { INVITATION_ERROR, SOMETHING_WRONG_ERROR } from "@/constants";
import { useConfig } from "@/hooks";

import { InvitationFormFields } from "./InvitationFormFields";

import type {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  InvitationExpiryDateField,
} from "@/types";

interface Properties {
  additionalInvitationFields?: AdditionalFormFields;
  apps?: InvitationAppOption[];
  expiryDateField?: InvitationExpiryDateField;
  onCancel?: () => void;
  onSubmitted?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareData?: (rawFormData: any) => any;
  roles?: InvitationRoleOption[];
}

export const InvitationForm = ({
  additionalInvitationFields,
  apps,
  expiryDateField,
  onSubmitted,
  onCancel,
  prepareData,
  roles,
}: Properties) => {
  const { t, i18n } = useTranslation("invitations");
  const config = useConfig();

  const [submitting, setSubmitting] = useState(false);

  // Stores the error code string (e.g. "USER_ALREADY_EXISTS_ERROR")
  const [error, setError] = useState<string | null>(null);

  // Stores dynamic values (email, role, app name) for the translation
  const [errorParameters, setErrorParameters] = useState<
    Record<string, string | number | undefined>
  >({});

  const getDefaultValues = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let defaultValues: any = { email: "", role: undefined };

    let filteredRoles = roles;

    if (apps?.length === 1) {
      const app = apps[0];
      defaultValues.app = app;
      filteredRoles = app.supportedRoles;
    }

    if (expiryDateField?.display) {
      defaultValues.expiresAt = null;
    }

    if (filteredRoles?.length === 1) {
      defaultValues.role = filteredRoles[0];
    }

    if (additionalInvitationFields?.defaultValues) {
      defaultValues = {
        ...defaultValues,
        ...additionalInvitationFields.defaultValues,
      };
    }

    return defaultValues;
  }, [
    apps,
    roles,
    additionalInvitationFields?.defaultValues,
    expiryDateField?.display,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFormData = (data: any) => {
    const parsedData: {
      email: string;
      role: string;
      appId?: number;
      expiresAt?: Date;
    } = {
      email: data.email,
      role: data.role,
    };

    if (data.app) {
      parsedData.appId = data.app;
    }

    if (data.expiresAt) {
      parsedData.expiresAt = data.expiresAt;
    }

    return parsedData;
  };

  const getErrorMessage = useCallback(() => {
    switch (error) {
      case INVITATION_ERROR.INVALID_EMAIL:
        return t("errors.invalidEmail", {
          email: errorParameters?.email,
        });

      case INVITATION_ERROR.INVITATION_ALREADY_EXISTS:
        return t("errors.invitationAlreadyExists");

      case INVITATION_ERROR.ROLE_NOT_FOUND:
        return t("errors.roleNotFound", {
          role: errorParameters?.role,
        });

      case INVITATION_ERROR.ROLE_NOT_SUPPORTED:
        return t("errors.roleNotSupported", {
          app: errorParameters?.app,
        });

      case INVITATION_ERROR.USER_ALREADY_EXISTS:
        return t("errors.userAlreadyExists", {
          email: errorParameters?.email,
        });

      default:
        return t("errors.somethingWrong");
    }
  }, [error, errorParameters, t]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setSubmitting(true);
    setError(null);

    const invitationData = prepareData ? prepareData(data) : getFormData(data);

    addInvitation(invitationData, config.apiBaseUrl)
      .then((response) => {
        // Success case
        toast.success(t("messages.invite.success"));

        if (onSubmitted) {
          onSubmitted(response);
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        const code = error?.response?.data?.code || SOMETHING_WRONG_ERROR;

        const selectedApp = apps?.find((app) => app.id === data.app)?.name;

        setErrorParameters({
          email: data.email,
          role: data.role,
          app: selectedApp || data.app,
        });

        setError(code);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let InvitationFormSchema: Zod.ZodObject<any> = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
  });

  if (apps?.length || roles?.length) {
    const RoleFormSchema = zod.object({
      role: zod.string({ required_error: t("validation.messages.role") }),
    });

    InvitationFormSchema = InvitationFormSchema.merge(RoleFormSchema);
  }

  if (apps?.length) {
    const AppIdFormSchema = zod.object({
      app: zod.number({
        required_error: t("validation.messages.app"),
      }),
    });

    InvitationFormSchema = InvitationFormSchema.merge(AppIdFormSchema);
  }

  if (expiryDateField?.display) {
    const ExpiresAtFormSchema = zod.object({
      expiresAt: zod.date({
        required_error: t("validation.messages.expiresAt"),
      }),
    });

    InvitationFormSchema = InvitationFormSchema.merge(ExpiresAtFormSchema);
  }

  if (additionalInvitationFields?.schema) {
    InvitationFormSchema = InvitationFormSchema.merge(
      additionalInvitationFields.schema,
    );
  }

  return (
    <>
      {error && (
        <Message
          message={getErrorMessage()}
          onClose={() => {
            setError(null);
          }}
          severity="danger"
        />
      )}
      <Provider
        onSubmit={onSubmit}
        defaultValues={getDefaultValues()}
        validationSchema={InvitationFormSchema}
        validationTriggerKey={i18n.language}
      >
        <InvitationFormFields
          renderAdditionalFields={additionalInvitationFields?.renderFields}
          apps={apps}
          expiryDateField={expiryDateField}
          loading={submitting}
          onCancel={onCancel}
          roles={roles}
        />
      </Provider>
    </>
  );
};
