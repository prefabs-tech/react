import {
  emailSchema,
  passwordSchema,
  Provider,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { LoginFormFields } from "./LoginFormFields";

const schema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
});

export const LoginForm = () => {
  const [t] = useTranslation("form");
  const navigate = useNavigate();

  return (
    <Page
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Provider
        className="form login-form"
        // eslint-disable-next-line no-console
        onSubmit={(data) => console.log(data)}
        validationSchema={schema}
      >
        <LoginFormFields />
      </Provider>
    </Page>
  );
};
