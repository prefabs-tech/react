import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BasicLayout } from "./layouts/BasicLayout";
import ErrorBoundary from "./Views/ErrorBoundary";
import {
  FormPage,
  Pages as FormPages,
  routes as formRoutes,
} from "./Views/Form";
import Home from "./Views/Home";
import {
  I18nPage,
  Pages as I18nPages,
  routes as i18nRoutes,
} from "./Views/I18n";
import {
  LayoutPage,
  Pages as LayoutPages,
  routes as layoutRoutes,
} from "./Views/Layout";
import { UIPage, Pages as UIPages, routes as uiRoutes } from "./Views/Ui";
import {
  UserPage,
  Pages as UserPages,
  routes as userRoutes,
} from "./Views/User";

const router = createBrowserRouter(
  [
    {
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          children: [
            {
              element: <UIPage></UIPage>,
              index: true,
            },
            ...uiRoutes,
          ],
          element: <UIPages />,
          path: "/ui",
        },
        {
          children: [
            {
              element: <UserPage></UserPage>,
              index: true,
            },
            ...userRoutes,
          ],
          element: <UserPages />,
          path: "/user",
        },
        {
          children: [
            {
              element: <FormPage></FormPage>,
              index: true,
            },
            ...formRoutes,
          ],
          element: <FormPages />,
          path: "/form",
        },
        {
          children: [
            {
              element: <LayoutPage></LayoutPage>,
              index: true,
            },
            ...layoutRoutes,
          ],
          element: <LayoutPages />,
          path: "/layout",
        },
        {
          children: [
            {
              element: <I18nPage></I18nPage>,
              index: true,
            },
            ...i18nRoutes,
          ],
          element: <I18nPages />,
          path: "/i18n",
        },
      ],
      element: <BasicLayout />,
      errorElement: <ErrorBoundary />,
      path: "/",
    },
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_PATH,
  },
);

const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
