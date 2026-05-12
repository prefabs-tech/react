import { useTranslation } from "@prefabs.tech/react-i18n";
import { Outlet } from "react-router-dom";

import { Demo } from "../../components/Demo";
import { FileInputDemo } from "./components/FileInput";
import { FormInputDemo } from "./components/FormInput";
import { LoginForm } from "./components/LoginForm/LoginForm";

export const FORM_ROUTES = {
  FILE_INPUT: "/form/file-input",
  FORM_INPUT: "/form/form-input",
  GET_STARTED: "/form",
  LOGIN_FORM: "/form/login",
};

export const routes = [
  {
    element: <FileInputDemo />,
    key: "fileInput.title",
    path: FORM_ROUTES.FILE_INPUT,
  },
  {
    element: <FormInputDemo />,
    key: "formInput.title",
    path: FORM_ROUTES.FORM_INPUT,
  },
  {
    element: <LoginForm />,
    key: "loginForm.title",
    path: FORM_ROUTES.LOGIN_FORM,
  },
];

export const Pages = () => {
  const [t] = useTranslation("form");

  const subnav = [
    { label: t("app:getStarted"), route: FORM_ROUTES.GET_STARTED },
    {
      label: t("headers.examples"),
      submenu: [
        ...routes.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
  ];

  return (
    <Demo isGrouped subnav={subnav}>
      <Outlet />
    </Demo>
  );
};
