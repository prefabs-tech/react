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

import { useConfig } from "../../hooks";
import { TermsAndConditions } from "./TermsAndConditions";

interface IProperties {
  disableEmailField?: boolean;
  hasConfirmPasswordFeature?: boolean;
  loading?: boolean;
  termsAndConditions?: React.ReactNode;
}

const SignupFormFields: React.FC<IProperties> = ({
  disableEmailField = false,
  hasConfirmPasswordFeature = false,
  loading,
  termsAndConditions,
}) => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const {
    control,
    formState: { errors, isSubmitted, submitCount },
    getFieldState,
    register,
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
      components={{
        Link: external ? (
          <a
            className="inline-link underlined"
            data-testid="external-link"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          />
        ) : (
          <Link
            className="inline-link underlined"
            data-testid="internal-link"
            to={url || ""}
          />
        ),
      }}
      i18nKey={"signup.form.termsAndConditions"}
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
        disabled={disableEmailField}
        label={t("signup.form.email.label")}
        name="email"
        placeholder={t("signup.form.email.placeholder")}
        submitCount={submitCount}
      />
      <Password
        getFieldState={getFieldState}
        helperText={t("signup.form.password.helperText")}
        label={t("signup.form.password.label")}
        name="password"
        register={register}
        submitCount={submitCount}
      />
      {hasConfirmPasswordFeature && (
        <Password
          getFieldState={getFieldState}
          label={t("signup.form.confirmPassword.label")}
          name="confirmPassword"
          register={register}
          submitCount={submitCount}
        />
      )}
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
            disabled:
              !!Object.values(errors).length ||
              (showTermsAndConditions && showCheckbox && !isChecked),
            id: "submit",
            label: t("signup.form.actions.submit"),
          },
        ]}
        alignment="fill"
        loading={loading}
      />
    </>
  );
};

export default SignupFormFields;
