import { useTranslation } from "@prefabs.tech/react-i18n";
import { AuthPage, Card, CardBody } from "@prefabs.tech/react-ui";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { acceptInvitation, getInvitationByToken } from "@/api/invitation";
import { useConfig, useUser } from "@/hooks";
import { Invitation, LoginCredentials } from "@/types";

import { login, SignupForm } from "..";

export const AcceptInvitation = ({
  centered = true,
}: {
  centered?: boolean;
}) => {
  const { t } = useTranslation("invitations");

  const config = useConfig();
  const { token } = useParams();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [invitation, setInvitation] = useState<Invitation | null>(null);

  const [acceptInvitationLoading, setAcceptInvitationLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);

      getInvitationByToken(token, config.apiBaseUrl)
        .then((response) => {
          if ("data" in response && response.data.status === "ERROR") {
            // TODO better handle errors
            setIsError(true);
          } else {
            setInvitation(response as Invitation);
          }
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleSubmit = (credentials: LoginCredentials) => {
    if (!token) {
      return;
    }

    setAcceptInvitationLoading(true);

    acceptInvitation(token, credentials, config?.apiBaseUrl)
      .then((response) => {
        setAcceptInvitationLoading(false);

        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(response.data.message);
        } else {
          setLoginLoading(true);

          // TODO acceptInvitation should return authenticated user from api
          login(credentials)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((result: any) => {
              if (result?.user) {
                setUser(result.user);
                toast.success(`${t("user:login.messages.success")}`);
              }
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((error: any) => {
              const errorMessage = t("errors:errors.otherErrors");

              if (error.name) {
                throw error as Error;
              }

              toast.error(error.message || errorMessage);
            })
            .finally(() => {
              setLoginLoading(false);
            });
        }
      })
      .catch(() => {
        setAcceptInvitationLoading(false);
        toast.error(`${t("invitations.messages.errorAcceptingInvitation")}`);
      });
  };

  const renderPageContent = () => {
    if (isError || !invitation) {
      return (
        <Card>
          <CardBody>
            <p>{t(`invitations.messages.errorFetchingInvitation`)}</p>
          </CardBody>
        </Card>
      );
    }

    if (
      invitation?.acceptedAt ||
      invitation?.revokedAt ||
      invitation?.expiresAt < Date.now()
    ) {
      return (
        <Card>
          <CardBody>
            <p>{t(`invitations.messages.invalidInvitation`)}</p>
          </CardBody>
        </Card>
      );
    }

    return (
      <SignupForm
        key={invitation.id}
        email={invitation.email || ""}
        handleSubmit={handleSubmit}
        loading={acceptInvitationLoading}
      />
    );
  };

  return (
    <AuthPage
      className="signup"
      title={t("user:signup.title")}
      loading={loading || loginLoading}
      centered={centered}
    >
      {renderPageContent()}
    </AuthPage>
  );
};
