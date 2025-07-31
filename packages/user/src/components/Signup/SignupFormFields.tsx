import {
  Email,
  FormActions,
  Password,
  useFormContext,
  useWatch,
} from "@prefabs.tech/react-form";
import { Trans, useTranslation } from "@prefabs.tech/react-i18n";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { TermsAndConditions } from "./TermsAndConditions";
import { useConfig } from "../../hooks";

interface IProperties {
  disableEmailField?: boolean;
  loading?: boolean;
  termsAndConditions?: React.ReactNode;
}

const SignupFormFields: React.FC<IProperties> = ({
  disableEmailField = false,
  loading,
  termsAndConditions,
}) => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const {
    register,
    getFieldState,
    formState: { errors, submitCount, isSubmitted },
    control,
    trigger,
    watch,
  } = useFormContext();

  const {
    display: showTermsAndConditions,
    external = false,
    showCheckbox,
    url,
  } = config.features?.termsAndConditions || {};

  let isChecked = false;

  const passwordFieldValue = watch("password");

  const _termsAndConditions = (
    <Trans
      i18nKey={"signup.form.termsAndConditions"}
      components={{
        Link: external ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link underlined"
            data-testid="external-link"
          />
        ) : (
          <Link
            to={url || ""}
            className="inline-link underlined"
            data-testid="internal-link"
          />
        ),
      }}
      t={t}
    />
  );

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    trigger("confirmPassword");
  }, [passwordFieldValue]);

  if (showTermsAndConditions && showCheckbox) {
    isChecked = useWatch({ control: control, name: "termsAndConditions" });
  }

  return (
    <>
      <Email
        label={t("signup.form.email.label")}
        name="email"
        placeholder={t("signup.form.email.placeholder")}
        submitCount={submitCount}
        disabled={disableEmailField}
      />
      <Password
        label={t("signup.form.password.label")}
        name="password"
        register={register}
        getFieldState={getFieldState}
        submitCount={submitCount}
        helperText={t("signup.form.password.helperText")}
      />
      <Password
        label={t("signup.form.confirmPassword.label")}
        name="confirmPassword"
        register={register}
        getFieldState={getFieldState}
        submitCount={submitCount}
      />
      {showTermsAndConditions ? (
        <TermsAndConditions
          hasCheckbox={showCheckbox}
          label={termsAndConditions || _termsAndConditions}
          name="termsAndConditions"
        />
      ) : null}

      <FormActions
        actions={[
          {
            id: "submit",
            disabled:
              !!Object.values(errors).length ||
              (showTermsAndConditions && showCheckbox && !isChecked),
            label: t("signup.form.actions.submit"),
          },
        ]}
        loading={loading}
        alignment="fill"
      />
    </>
  );
};

export default SignupFormFields;
