import {
  Select,
  DaysInput,
  DatePicker,
  Email,
  useFormContext,
  useWatch,
  RenderAdditionalFormFields,
  FormActions,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React, { useEffect, useMemo, useState } from "react";

import {
  InvitationAppOption,
  InvitationExpiryDateField,
  InvitationRoleOption,
} from "@/types";

interface IProperties {
  renderAdditionalFields?: RenderAdditionalFormFields;
  apps?: InvitationAppOption[];
  expiryDateField?: InvitationExpiryDateField;
  loading?: boolean;
  onCancel?: () => void;
  roles?: InvitationRoleOption[];
}
export const InvitationFormFields: React.FC<IProperties> = ({
  renderAdditionalFields,
  apps,
  expiryDateField,
  roles,
  loading,
  onCancel,
}) => {
  const { t } = useTranslation("invitations");

  const {
    register,
    getFieldState,
    setValue,
    formState: { errors, submitCount },
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
        return { value: app.id, label: app.label };
      }

      return {
        value: app.id,
        label: app.name,
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
          name="app"
          label={t("form.fields.app.label")}
          placeholder={t("form.fields.app.placeholder")}
          options={updatedApps}
        />
      ) : null}

      {apps?.length || roles?.length ? (
        <Select
          autoSelectSingleOption
          disabled={filteredRoles.length <= 1 && true}
          name="role"
          label={t("form.fields.role.label")}
          placeholder={t("form.fields.role.placeholder")}
          options={filteredRoles}
        />
      ) : null}

      {renderAdditionalFields ? renderAdditionalFields(useFormContext) : null}

      {expiryDateField?.display ? renderExpiryDateField() : null}

      <FormActions
        actions={[
          {
            id: "submit",
            label: t("form.actions.submit"),
            disabled: !!Object.values(errors).length,
          },
          {
            id: "cancel",
            onClick: (event) => {
              event.preventDefault();
              onCancel && onCancel();
            },
            label: t("form.actions.cancel"),
          },
        ]}
        alignment="right"
        loading={loading}
      />
    </>
  );
};
