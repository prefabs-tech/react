import {
  DatePicker,
  DaysInput,
  Email,
  FormActions,
  RenderAdditionalFormFields,
  Select,
  useFormContext,
  useWatch,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React, { useEffect, useMemo, useState } from "react";

import {
  InvitationAppOption,
  InvitationExpiryDateField,
  InvitationRoleOption,
} from "@/types";

interface IProperties {
  apps?: InvitationAppOption[];
  expiryDateField?: InvitationExpiryDateField;
  loading?: boolean;
  onCancel?: () => void;
  renderAdditionalFields?: RenderAdditionalFormFields;
  roles?: InvitationRoleOption[];
}
export const InvitationFormFields: React.FC<IProperties> = ({
  apps,
  expiryDateField,
  loading,
  onCancel,
  renderAdditionalFields,
  roles,
}) => {
  const { t } = useTranslation("invitations");

  const {
    formState: { errors, submitCount },
    getFieldState,
    register,
    setValue,
  } = useFormContext();

  const [filteredRoles, setFilteredRoles] = useState(
    roles?.map((role) => {
      return {
        label: role.name,
        value: role.name,
      };
    }) || [],
  );

  const selectedApp: number = useWatch({
    name: "app",
  });

  const selectedRole =
    apps
      ?.find((app) => app.id === selectedApp)
      ?.supportedRoles.map((role) => {
        return {
          label: role.name,
          value: role.name,
        };
      }) || [];

  useEffect(() => {
    if (selectedApp) {
      setValue("role", undefined); // reset role value when app changes

      setFilteredRoles(selectedRole || []);
    }
  }, [selectedApp]);

  const renderExpiryDateField = () => (
    <>
      {expiryDateField?.mode === "calendar" ? (
        <DatePicker
          className="expires-at"
          key="calender"
          label={t("form.fields.expiresAt.label")}
          minDate={new Date()}
          name="expiresAt"
          panelClassName="expires-at-panel"
          placeholder={t("form.fields.expiresAt.placeholder")}
        />
      ) : (
        <DaysInput
          getFieldState={getFieldState}
          label={t("form.fields.expiresAfter.label")}
          name="expiresAt"
          placeholder={t("form.fields.expiresAfter.placeholder")}
          register={register}
        />
      )}
    </>
  );

  const updatedApps = useMemo(() => {
    let modifiedApps = apps || [];
    const currentOrigin = window.location.origin;

    const appToMove = modifiedApps.find((app) => app.origin === currentOrigin);

    if (appToMove) {
      modifiedApps = modifiedApps.filter((app) => app.origin !== currentOrigin);
      modifiedApps = [
        { ...appToMove, name: t("app:thisApp") },
        ...modifiedApps,
      ];
    }

    const modifiedLabels = modifiedApps.map((app) => {
      if (app.label) {
        return { label: app.label, value: app.id };
      }

      return {
        label: app.name,
        value: app.id,
      };
    });

    return modifiedLabels;
  }, [apps]);

  return (
    <>
      <Email
        label={t("form.fields.email.label")}
        name="email"
        placeholder={t("form.fields.email.placeholder")}
        submitCount={submitCount}
      />

      {apps?.length ? (
        <Select
          label={t("form.fields.app.label")}
          name="app"
          options={updatedApps}
          placeholder={t("form.fields.app.placeholder")}
        />
      ) : null}

      {apps?.length || roles?.length ? (
        <Select
          autoSelectSingleOption
          disabled={filteredRoles.length <= 1 && true}
          label={t("form.fields.role.label")}
          name="role"
          options={filteredRoles}
          placeholder={t("form.fields.role.placeholder")}
        />
      ) : null}

      {renderAdditionalFields ? renderAdditionalFields(useFormContext) : null}

      {expiryDateField?.display ? renderExpiryDateField() : null}

      <FormActions
        actions={[
          {
            disabled: !!Object.values(errors).length,
            id: "submit",
            label: t("form.actions.submit"),
          },
          {
            id: "cancel",
            label: t("form.actions.cancel"),
            onClick: (event) => {
              event.preventDefault();
              onCancel && onCancel();
            },
          },
        ]}
        alignment="right"
        loading={loading}
      />
    </>
  );
};
