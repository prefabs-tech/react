import { FormSubmitOptions } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Message } from "@prefabs.tech/react-ui";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { ChangePasswordForm } from "@/components";
import { changePassword } from "@/supertokens";

import { useConfig } from "../../hooks";

export type ChangePasswordFormData = {
  oldPassword: string;
  password: string;
};

export const ChangePasswordTab = ({
  centered = false,
}: {
  centered?: boolean;
}) => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<"incorrectPassword" | "other" | null>(
    null,
  );

  const handleSubmit = async (
    data: ChangePasswordFormData,
    options?: FormSubmitOptions,
  ) => {
    setLoading(true);

    const response = await changePassword(
      data.oldPassword,
      data.password,
      config.apiBaseUrl,
    );

    if (response.status === "OK") {
      toast.success(t("changePassword.messages.success"));

      if (options && options.reset) {
        options.reset();
      }
    } else if (response.status === "INVALID_PASSWORD") {
      setError("incorrectPassword");
    } else {
      setError("other");
    }

    setLoading(false);
  };

  const errorMessage =
    error === "incorrectPassword"
      ? t("errors.incorrectPassword", { ns: "errors" })
      : t("errors.otherErrors", { ns: "errors" });

  return (
    <>
      {error && (
        <Message
          message={errorMessage}
          onClose={() => {
            setError(null);
          }}
          severity="danger"
        />
      )}
      <ChangePasswordForm handleSubmit={handleSubmit} loading={loading} />
    </>
  );
};
