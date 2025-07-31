import { useTranslation } from "@prefabs.tech/react-i18n";
import { toast } from "react-toastify";

import { disableUser, enableUser } from "../../api/user";
import { useConfig } from "../../hooks";

export const useUserActions = ({
  onUserDisabled,
  onUserEnabled,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserDisabled?: (response: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserEnabled?: (response: any) => void;
}) => {
  const config = useConfig();

  const { t } = useTranslation("users");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDisableUser = (user: any) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEnableUser = (user: any) => {
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
