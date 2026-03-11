import { useTranslation } from "@prefabs.tech/react-i18n";
import { toast } from "react-toastify";

import { ExtendedUser } from "@/types";

import { disableUser, enableUser } from "../../api/user";
import { useConfig } from "../../hooks";

export const useUserActions = ({
  onUserDisabled,
  onUserEnabled,
}: {
  onUserDisabled?: (response: unknown) => void;
  onUserEnabled?: (response: unknown) => void;
}) => {
  const config = useConfig();

  const { t } = useTranslation("users");

  const handleDisableUser = (user: ExtendedUser) => {
    disableUser(user.id, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response && response.data.status === "OK") {
          toast.success(t("messages.disable.success"));

          if (onUserDisabled) {
            onUserDisabled(response);
          }
        } else {
          toast.error(t("messages.disable.error"));
        }
      })
      .catch(() => {
        toast.error(t("messages.disable.error"));
      });
  };

  const handleEnableUser = (user: ExtendedUser) => {
    enableUser(user.id, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response && response.data.status === "OK") {
          toast.success(t("messages.enable.success"));

          if (onUserEnabled) {
            onUserEnabled(response);
          }
        } else {
          toast.error(t("messages.enable.error"));
        }
      })
      .catch(() => {
        toast.error(t("messages.enable.error"));
      });
  };

  return { handleDisableUser, handleEnableUser };
};
