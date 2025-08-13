import { useTranslation } from "@prefabs.tech/react-i18n";
import { AuthPage, Message } from "@prefabs.tech/react-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getIsFirstUser, signUpFirstUser } from "@/api/user";
import { DEFAULT_PATHS } from "@/constants";
import { useConfig, useUser } from "@/hooks";

import { login, SignupForm } from "..";

import type { LoginCredentials } from "@/types";

export const SignUpFirstUser = ({
  centered = true,
}: {
  centered?: boolean;
}) => {
  const { t } = useTranslation("user");

  const config = useConfig();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<"loginError" | "signupError" | null>(null);

  const [signUpFirstUserLoading, setSignUpFirstUserLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getIsFirstUser(config.apiBaseUrl)
      .then((response) => {
        if (!response?.signUp) {
          navigate(config.customPaths?.login || DEFAULT_PATHS.LOGIN);
        }
      })
      .catch(() => {
        setError("signupError");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (credentials: LoginCredentials) => {
    setSignUpFirstUserLoading(true);

    signUpFirstUser(credentials, config.apiBaseUrl)
      .then(() => {
        setSignUpFirstUserLoading(false);
        setLoginLoading(true);
        toast.success(`${t("firstUser.signup.messages.success")}`);

        // TODO Sign up first-user should return authenticated user from api
        login(credentials)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((result: any) => {
            if (result?.user) {
              setUser(result.user);
              toast.success(`${t("login.messages.success")}`);
            }
          })
          .catch(() => {
            setLoginLoading(false);
            navigate(config.customPaths?.login || DEFAULT_PATHS.LOGIN);
          })
          .finally(() => {
            setLoginLoading(false);
          });
      })
      .catch(() => {
        setSignUpFirstUserLoading(false);
        setError("signupError");
      });
  };

  const message =
    error === "signupError"
      ? t("firstUser.signup.messages.error")
      : t("firstUser.login.messages.error");

  const renderPageContent = () => {
    return (
      <>
        {error && (
          <Message
            message={message}
            onClose={() => {
              setError(null);
            }}
            severity="danger"
          />
        )}
        <SignupForm
          email={""}
          handleSubmit={handleSubmit}
          loading={signUpFirstUserLoading}
        />
      </>
    );
  };

  return (
    <AuthPage
      centered={centered}
      className="signup"
      loading={loading || loginLoading}
      title={t("firstUser.title")}
    >
      {renderPageContent()}
    </AuthPage>
  );
};
