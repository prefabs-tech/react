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
      path: "/",
      element: <BasicLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/ui",
          element: <UIPages />,
          children: [
            {
              index: true,
              element: <UIPage></UIPage>,
            },
            ...uiRoutes,
          ],
        },
        {
          path: "/user",
          element: <UserPages />,
          children: [
            {
              index: true,
              element: <UserPage></UserPage>,
            },
            ...userRoutes,
          ],
        },
        {
          path: "/form",
          element: <FormPages />,
          children: [
            {
              index: true,
              element: <FormPage></FormPage>,
            },
            ...formRoutes,
          ],
        },
        {
          path: "/layout",
          element: <LayoutPages />,
          children: [
            {
              index: true,
              element: <LayoutPage></LayoutPage>,
            },
            ...layoutRoutes,
          ],
        },
        {
          path: "/i18n",
          element: <I18nPages />,
          children: [
            {
              index: true,
              element: <I18nPage></I18nPage>,
            },
            ...i18nRoutes,
          ],
        },
      ],
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
