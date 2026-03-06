import { useTranslation } from "@prefabs.tech/react-i18n";
import { LoadingIcon } from "@prefabs.tech/react-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { DEFAULT_PATHS } from "@/constants";
import { verifySessionRoles } from "@/supertokens";

import { useConfig, useUser } from "../../hooks";

import type { UserType } from "../../types";

export const AuthSocialLoginCallback = () => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const loginPath = config.customPaths?.login || DEFAULT_PATHS.LOGIN;

  const authCallback = async () => {
    try {
      const response = await thirdPartySignInAndUp();

      if (response.status === "OK") {
        const user: unknown = response.user;

        if (
          user &&
          config &&
          (await verifySessionRoles(config.supportedRoles))
        ) {
          await setUser(user as UserType);

          toast.success(`${t("authSocialLoginCallback.email.success")}`);
        } else {
          toast.error(t("login.messages.permissionDenied"));

          navigate(loginPath);
        }
      } else {
        toast.error(`${t("authSocialLoginCallback.email.error")}`);

        navigate(loginPath);
      }
    } catch (error) {
      const _error = error as {
        isSuperTokensGeneralError?: boolean;
        message?: string;
      };

      if (_error.isSuperTokensGeneralError === true) {
        toast.error(_error.message);
      } else {
        toast.error(`${t("authSocialLoginCallback.message.error")}`);
      }

      navigate(loginPath);
    }
  };

  useEffect(() => {
    authCallback();
  }, []);

  return (
    <div className="loading-overlay">
      <LoadingIcon color="#55575f" fontSize={"0.5rem"} />
    </div>
  );
};
