import { Provider, emailSchema } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Message } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { getMe } from "@/api/user";
import { useConfig } from "@/hooks";
import { changeEmail } from "@/supertokens";

import { UpdateEmailFormFields } from "./UpdateEmailFormFields";
import { UserType } from "../../types";

interface Properties {
  setModalVisible: (visible: boolean) => void;
  user: UserType | null;
  setUser: (user: UserType) => void;
}

type UpdateEmailFormData = {
  email: string;
};

type ErrorType =
  | "alreadyExist"
  | "disabled"
  | "duplicate"
  | "invalid"
  | "other";

const errorMessagesMap: Record<ErrorType, string> = {
  alreadyExist: "profile.accountInfo.messages.alreadyExist",
  duplicate: "profile.accountInfo.messages.duplicate",
  invalid: "profile.accountInfo.messages.invalid",
  disabled: "profile.accountInfo.messages.disabled",
  other: "profile.accountInfo.messages.error",
};

export const UpdateEmailForm = ({
  user,
  setModalVisible,
  setUser,
}: Properties) => {
  const { t, i18n } = useTranslation("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const config = useConfig();

  const emailValidationSchema = z.object({
    email: emailSchema({
      invalid: t("profile.accountInfo.messages.invalid"),
      required: t("profile.accountInfo.messages.email"),
    }),
  });

  const handleSubmit = async (data: UpdateEmailFormData) => {
    setLoading(true);

    try {
      const response = await changeEmail(data.email, config.apiBaseUrl);

      switch (response?.status) {
        case "OK": {
          const userInfo = await getMe(config.apiBaseUrl);
          const isSameEmail = userInfo.data.email === user?.email;

          if (config.features?.emailVerification && isSameEmail) {
            toast.success("A verification link has been sent to your email.");
          } else {
            setUser(userInfo.data);
            toast.success(t("profile.accountInfo.messages.success"));
          }

          setModalVisible(false);
          break;
        }
        case "EMAIL_ALREADY_EXISTS_ERROR": {
          setError("alreadyExist");
          break;
        }
        case "EMAIL_SAME_AS_CURRENT_ERROR": {
          setError("duplicate");
          break;
        }
        case "EMAIL_INVALID_ERROR": {
          setError("invalid");
          break;
        }
        case "EMAIL_FEATURE_DISABLED_ERROR": {
          setError("disabled");
          break;
        }
        default: {
          setError("other");
          break;
        }
      }

      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("other");

      setLoading(false);
    }
  };

  const errorMessage = error ? t(errorMessagesMap[error]) : "";

  const formValues = {
    email: user?.email || "",
  };

  return (
    <>
      {error && (
        <Message
          enableClose={true}
          message={errorMessage}
          onClose={() => {
            setError(null);
          }}
          severity="danger"
        />
      )}
      <Provider
        validationSchema={emailValidationSchema}
        onSubmit={handleSubmit}
        values={formValues}
        validationTriggerKey={i18n.language}
      >
        <UpdateEmailFormFields
          loading={loading}
          setModalVisible={setModalVisible}
        />
      </Provider>
    </>
  );
};
