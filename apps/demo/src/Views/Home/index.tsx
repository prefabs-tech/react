import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page, GridContainer } from "@prefabs.tech/react-ui";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Package } from "./components/Package";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const packages = [
    {
      name: "ui",
      route: "/ui",
      description: "@prefabs.tech/react-ui components and utilities",
    },
    {
      name: "user",
      route: "/user",
      description: "@prefabs.tech/react-user components and utilities",
    },
    {
      name: "form",
      route: "/form",
      description: "@prefabs.tech/react-form components and utilities",
    },

    {
      name: "layout",
      route: "/layout",
      description: "@prefabs.tech/react-layout components and utilities",
    },
    {
      name: "i18n",
      route: "/i18n",
      description: "@prefabs.tech/react-i18n components and utilities",
    },
  ];

  return (
    <Page title={t("pages.home.title")} className="home">
      <GridContainer>
        {packages.map((package_) => {
          return (
            <Package
              key={package_.route}
              title={t(`header.menu.${package_.name}`)}
              description={package_.description}
              onClick={() => navigate(package_.route)}
            />
          );
        })}
      </GridContainer>
    </Page>
  );
};

export default Home;
