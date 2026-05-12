import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";

import { getIsFirstUser } from "@/api/user";
import { DEFAULT_PATHS } from "@/constants";
import { UserConfig } from "@/types/config";

type UseFirstUserSignupArguments = (
  | { autoRedirect: false; redirectFn: undefined }
  | {
      autoRedirect: true;
      redirectFn: ((to?: string) => void) | NavigateFunction;
    }
) & {
  config: UserConfig;
};

export const useFirstUserSignup = ({
  autoRedirect = false,
  config,
  redirectFn,
}: UseFirstUserSignupArguments) => {
  const [redirecting, setRedirecting] = useState<boolean | null>(null);
  const [isFirstUser, setIsFirstUser] = useState<boolean | null>(null);

  useEffect(() => {
    if (
      config.features?.signup === false &&
      config.features?.signupFirstUser !== false
    ) {
      setRedirecting(true);

      getIsFirstUser(config.apiBaseUrl)
        .then((response) => {
          if (response?.signUp) {
            setIsFirstUser(true);

            if (autoRedirect && redirectFn) {
              redirectFn(
                config.customPaths?.signupFirstUser ||
                  DEFAULT_PATHS.SIGNUP_FIRST_USER,
              );
            }
          } else {
            setIsFirstUser(false);
          }
        })
        .catch(() => {
          // do nothing
        })
        .finally(() => {
          setRedirecting(false);
        });
    }
  }, [config, autoRedirect, redirectFn]);

  return [redirecting, isFirstUser];
};
